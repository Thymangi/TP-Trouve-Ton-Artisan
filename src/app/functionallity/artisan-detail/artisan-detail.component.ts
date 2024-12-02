import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtisanService } from '../../architecture/service/artisan.service';
import { Artisan } from '../../architecture/service/artisan.model';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { SeoService } from '../../architecture/service/seo.service.js';

// Fonction de validation personnalisée pour le CAPTCHA
function captchaValidator(control: AbstractControl): ValidationErrors | null {
  const expectedCaptcha = '12345'; // Texte attendu pour le CAPTCHA
  if (control.value !== expectedCaptcha) {
    return { invalidCaptcha: true };
  }
  return null;
}
@Component({
  selector: 'app-artisan-detail',
  templateUrl: './artisan-detail.component.html',
  styleUrls: ['./artisan-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class ArtisanDetailComponent implements OnInit {
  artisan: Artisan | undefined;
  contactForm!: FormGroup;
  emailStatus: 'success' | 'error' | null = null;
  emailMessage: string = '';
  captchaText: string = ''; // Texte CAPTCHA généré dynamiquement

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private artisanService: ArtisanService,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    const artisanId = this.route.snapshot.paramMap.get('id');
    if (artisanId) {
      this.artisanService.getArtisanById(artisanId).subscribe(
        (data: Artisan) => {
          this.artisan = data;

          // Mettre à jour les meta tags pour le SEO
          this.seoService.updateMeta(
            `${data.name} - ${data.specialty} en ${data.location}`,
            `Découvrez ${data.name}, un(e) ${data.specialty} basé(e) à ${data.location}. Contactez ce professionnel pour vos besoins en ${data.specialty}.`
          );
        },
        (error) => {
          console.error(
            "Erreur lors de la récupération des détails de l'artisan",
            error
          );
        }
      );
    }

    // Générer un CAPTCHA dynamique
    this.captchaText = Math.random().toString(36).substring(2, 7);

    // Initialiser le formulaire de contact
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      subject: ['', [Validators.required, Validators.minLength(3)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      captcha: [
        '',
        [
          Validators.required,
          (control: AbstractControl) => {
            return control.value === this.captchaText
              ? null
              : { invalidCaptcha: true };
          },
        ],
      ],
    });
  }

  generateStars(note: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1);
  }

  sendContactForm(): void {
    if (this.contactForm.valid) {
      const formData = {
        name: this.contactForm.value.name,
        subject: this.contactForm.value.subject,
        message: this.contactForm.value.message,
        recipientEmail: this.artisan?.email,
      };

      // Sécurité : Valider côté serveur aussi
      this.artisanService.sendEmail(formData).subscribe(
        () => {
          this.emailStatus = 'success';
          this.emailMessage = 'Votre message a été envoyé avec succès.';
          this.contactForm.reset();
        },
        (error: any) => {
          console.error("Erreur lors de l'envoi de l'email :", error);
          this.emailStatus = 'error';
          this.emailMessage = "Une erreur s'est produite. Veuillez réessayer.";
        }
      );
    }
  }
}
