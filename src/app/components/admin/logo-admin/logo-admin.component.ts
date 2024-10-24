import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-logo-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-admin.component.html',
  styleUrls: ['./logo-admin.component.css']
})
export class LogoAdminComponent {
  logoUrl: string | null = null; // Almacena la URL del logo subido

  openCloudinaryWidget() {
    const widget = (window as any).cloudinary.createUploadWidget(
      {
        cloudName: 'dntrj0gde',
        uploadPreset: 'HOLAA_IMAGEN',
        sources: ['local', 'url'],
        multiple: false,
        clientAllowedFormats: ['webp'],
        maxImageFileSize: 2000000,
        cropping: true,
        croppingAspectRatio: 1,
        folder: 'logos',
        transformation: [{ width: 300, height: 300, crop: 'limit' }],
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          const imageUrl = result.info.secure_url;
          this.logoUrl = imageUrl;  // Almacena la URL del logo subido
          console.log('Imagen subida con éxito. URL:', imageUrl);
          this.sendImageToBackend(imageUrl);
        }
      }
    );

    widget.open();
  }

  sendImageToBackend(imageUrl: string) {
    console.log('URL a enviar al backend:', imageUrl);
    // Implementar la lógica para enviar la URL al backend si es necesario
  }
}
