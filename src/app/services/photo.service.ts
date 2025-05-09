import { Injectable } from '@angular/core';
//Importaciones para el servicio de fotos
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { Platform } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';
import { ActionSheetButton } from '@ionic/core';

@Injectable({
  providedIn: 'root',
})
export class PhotoService {
  public photos: UserPhoto[] = [];
  private PHOTO_STORAGE: string = 'photos';
  private platform: Platform;

  constructor(platform: Platform,private actionSheetCtrl: ActionSheetController) {
    this.platform = platform;
  }

  public async addNewToGallery(photoQuality: number = 100): Promise<void> {
    // Tomamos la foto desde la cámara con la calidad seleccionada
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: photoQuality,
    });
    // Guardamos y mostramos la imagen
    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile); // Agregamos la imagen al inicio del arreglo de fotos

    //Guardamos y mostramos la imagen en el almacenamiento local
    await Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });
  }
  // Tomamos la foto desde la galería con la calidad seleccionada
  async presentPhotoOptions() {
    const actionSheet  = await this.actionSheetCtrl.create({
      header: 'Seleccionar foto la calidad de la foto',
      buttons: [
        {
          text: 'Alta (100%)',
          handler: () => {
            this.addNewToGallery(100);
          },
        },
        {
          text: 'Media (50%)',
          handler: () => {
            this.addNewToGallery(50);
          },
        },
        {
          text: 'Cancelar',
          role: 'cancel',
        },
      ],
    });

    await actionSheet.present();
  }

  private async savePicture(photo: Photo) {
    //Convertir la foto a base64
    const base64Data = await this.readAsBase64(photo);

    //Escribir el archivo en el sistema de archivos
    const fileName = Date.now() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });
    if (this.platform.is('hybrid')) {
      //Usar el webPath display de la foto para mostrar la imagen en la app
      return {
        filepath: savedFile.uri,
        webviewPath: Capacitor.convertFileSrc(savedFile.uri),
      };
    } else {
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
      };
    }
  }

  private async readAsBase64(photo: Photo) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path!,
      });

      return file.data;
    } else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();

      return (await this.convertBlobToBase64(blob)) as string;
    }
  }

  private convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });

  // Save the photo to the filesystem
  public async loadSaved() {
    // Obtener los datos del arreglo de fotos guardado en caché
    const { value } = await Preferences.get({ key: this.PHOTO_STORAGE });
    this.photos = (value ? JSON.parse(value) : []) as UserPhoto[];

    // La forma más fácil de detectar si se está ejecutando en la web:
    // “cuando la plataforma NO es híbrida, hacer esto”
    if (!this.platform.is('hybrid')) {
      // Mostrar la foto leyendo el archivo en formato base64
      for (let photo of this.photos) {
        // Leer los datos de cada foto guardada desde el sistema de archivos
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        });

        // Solo en la plataforma web: cargar la foto como datos base64
        photo.webviewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }
  }
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
