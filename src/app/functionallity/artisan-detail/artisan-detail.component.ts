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
import { SeoService } from '../../architecture/service/seo.service.js';

@Component({
  selector: 'app-artisan-detail',
  templateUrl: './artisan-detail.component.html',
  styleUrls: ['./artisan-detail.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // Ajout de ReactiveFormsModule pour les formulaires réactifs
})
export class ArtisanDetailComponent implements OnInit {
  artisan: Artisan | undefined;
  contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private artisanService: ArtisanService,
    private seoService: SeoService // Injecter le SeoService
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

    // Initialiser le formulaire de contact
    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  generateStars(note: number): number[] {
    return Array.from({ length: 5 }, (_, i) => i + 1); // Crée un tableau de [1, 2, 3, 4, 5]
  }

  sendContactForm(): void {
    if (this.contactForm.valid) {
      const formValues = this.contactForm.value;
      this.artisanService.sendEmailToArtisan(formValues).subscribe(
        (response) => {
          console.log('E-mail envoyé avec succès', response);
          alert('Votre message a été envoyé.');
          this.contactForm.reset();
        },
        (error) => {
          console.error("Erreur lors de l'envoi de l'e-mail", error);
          alert('Une erreur est survenue. Veuillez réessayer plus tard.');
        }
      );
    }
  }
}
