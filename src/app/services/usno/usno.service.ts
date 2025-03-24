import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';



export interface CelestialData {
    sundata?: CelestialBody | null;
    moondata?: CelestialBody | null;
    planets?: CelestialBody[];
    stars?: CelestialBody[];
}

export interface CelestialBody {
    name: string;
    almanac_data: { [key: string]: any };
    altitude_corrections: { [key: string]: any };
    nav_star_number?: number | string;
    moon_phase?: string;
    moon_illum?: number;
    altitude?: number;
    azimuth?: number;
    declination?: number;
    gha?: number;
    refrCorrection?: number;
    parallax?: number;
    sd?: number;

}
const planetNames = ['mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];

@Injectable({
    providedIn: 'root'
})
export class UsnoService {
    // URL du backend local au lieu de l'API directe
    private readonly API_URL = 'http://localhost:3080/usno';

    planetImages: { [key: string]: string } = {
        'mercury': 'astres/mercury.jpg',
        'venus': 'astres/venus.jpg',
        'mars': 'astres/mars.jpg',
        'jupiter': 'astres/jupiter.jpg',
        'saturn': 'astres/saturn.jpg',
        'uranus': 'astres/uranus.jpg',
        'neptune': 'astres/neptune.jpg',
        'pluto': 'astres/pluto.jpg',
        'sun': 'astres/sun.jpg',
        'moon': 'astres/moon.jpg'
    };

    constructor(
        private http: HttpClient
    ) { }

    getCelestialData(
        date: string | Date,
        time: string,
        latitude: number,
        longitude: number
    ): Observable<CelestialData> {
        // Formater la date si c'est un objet Date
        const formattedDate = date instanceof Date ? this.formatDateForApi(date) : date;

        // Formater les coordonnées à 4 décimales
        const formattedLat = parseFloat(latitude.toFixed(4));
        const formattedLon = parseFloat(longitude.toFixed(4));

        console.log(`Envoi de requête au backend: date=${formattedDate}, time=${time}, lat=${formattedLat}, lon=${formattedLon}`);

        // Appel au backend local avec les bons paramètres
        return this.http.get<any>(this.API_URL, { // Changé de CelestialData à any
            params: {
                date: formattedDate,
                time: time,
                lat: formattedLat.toString(),
                lon: formattedLon.toString()
            }
        }).pipe(
            map(response => {
                console.log('Réponse reçue du backend:', response);

                // Transformer les données en format CelestialData
                return this.parseCelestialData(response);
            }),
            catchError(error => {
                console.error('Erreur backend:', error);
                console.log('Erreur détectée, utilisation de données simulées');
                return of(this.generateMockData());
            })
        );
    }
    parseCelestialData(jsonData: any): CelestialData {
        const celestialData: CelestialData = {
            sundata: null,
            moondata: null,
            planets: [],
            stars: []
        };

        if (!jsonData.properties || !Array.isArray(jsonData.properties.data)) {
            return celestialData;
        }

        const moonPhase: string | undefined = jsonData.properties.moon_phase;
        const moonIllum: number | undefined = jsonData.properties.moon_illum;

        jsonData.properties.data.forEach((item: any) => {
            const name = (item.object as string).toLowerCase();
            const altitude = item.almanac_data?.hc ?? null;
            const azimuth = item.almanac_data?.zn ?? null;
            const declination = item.almanac_data?.dec ?? null;
            const gha = item.almanac_data?.gha ?? null;
            const refrCorrection = item.altitude_corrections?.refr ?? 0;
            const parallax = item.altitude_corrections?.pa ?? 0;
            const sd = item.altitude_corrections?.sd ?? 0;
            const correctedAltitude = altitude !== null ? altitude + refrCorrection + parallax : null;

            const celestialObject: CelestialBody = {
                name: item.object,
                altitude: correctedAltitude,
                azimuth: azimuth,
                declination: declination,
                gha: gha,
                refrCorrection: refrCorrection,
                parallax: parallax,
                sd: sd,
                almanac_data: item.almanac_data,
                altitude_corrections: item.altitude_corrections,
                nav_star_number: item.nav_star_number
            };
            if (!this.isCelestialObjectVisible(correctedAltitude)) return;
            if (name === 'sun') {
                celestialData.sundata = celestialObject;
            } else if (name === 'moon') {
                celestialObject.moon_phase = moonPhase;
                celestialObject.moon_illum = moonIllum;
                celestialData.moondata = celestialObject;
            } else if (planetNames.includes(name)) {
                celestialData.planets?.push(celestialObject);
            } else {
                celestialData.stars?.push(celestialObject);
            }
        });

        return celestialData;
    }


    formatDateForApi(date: Date): string {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }



    isCelestialObjectVisible(altitude?: number): boolean {
        if (altitude === undefined || altitude === null) return false;
        return altitude > 0;
    }

    getCardinalDirection(azimuth: number): string {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO'];
        const index = Math.round(azimuth / 45) % 8;
        return directions[index];
    }

    getPlanetImage(celestialBody: CelestialBody | string): string {
        if (typeof celestialBody === 'string') {
            return this.planetImages[celestialBody.toLowerCase()] || 'astres/planet.jpg';
        }
        if (celestialBody.nav_star_number !== undefined) {
            return 'astres/star.jpg';
        }

        return 'astres/planet.jpg';
    }

    generateMockData(): CelestialData {
        console.log('Génération de données simulées USNO');

        // Création de l'objet CelestialData avec la structure attendue
        const mockData: CelestialData = {
            sundata: {
                name: 'Sun',
                almanac_data: {
                    dec: 1.624897,
                    gha: 356.708774,
                    hc: 43.527527,  // altitude
                    zn: 175.682919  // azimuth
                },
                altitude_corrections: {
                    isCorrected: true,
                    pa: 0.001768,
                    refr: -0.017594,
                    sd: 0.267358,
                    sum: 0.251532
                }
            },
            moondata: {
                name: 'Moon',
                almanac_data: {
                    dec: -25.012248,
                    gha: 59.316187,
                    hc: 35.369392,
                    zn: 231.320934  // azimuth
                },
                altitude_corrections: {
                    isCorrected: true,
                    pa: 0.003,
                    refr: -0.02,
                    sd: 0.5,
                    sum: 0.483
                }
            },
            planets: [
                {
                    name: 'Venus',
                    almanac_data: {
                        dec: 8.292856,
                        gha: 2.180322,
                        hc: 50.224833,  // altitude
                        zn: 183.623197  // azimuth
                    },
                    altitude_corrections: {
                        isCorrected: true,
                        pa: 0.005528,
                        refr: -0.013799,
                        sd: 0,
                        sum: -0.008271
                    }
                },
                {
                    name: 'Mars',
                    almanac_data: {
                        dec: 24.573112,
                        gha: 246.917235,
                        hc: 14.141028,  // altitude
                        zn: 57.120563   // azimuth
                    },
                    altitude_corrections: {
                        isCorrected: true,
                        pa: 0.002276,
                        refr: -0.184433,
                        sd: 0,
                        sum: -0.182157
                    }
                },
                {
                    name: 'Jupiter',
                    almanac_data: {
                        dec: 22.255659,
                        gha: 286.838047,
                        hc: 27.550451,  // altitude
                        zn: 86.624911   // azimuth
                    },
                    altitude_corrections: {
                        isCorrected: true,
                        pa: 0.000404,
                        refr: -0.031583,
                        sd: 0,
                        sum: -0.031179
                    }
                },
                {
                    name: 'Saturn',
                    almanac_data: {
                        dec: -4.317662,
                        gha: 5.590898,
                        hc: 37.421148,  // altitude
                        zn: 187.229331  // azimuth
                    },
                    altitude_corrections: {
                        isCorrected: true,
                        pa: 0.000183,
                        refr: -0.021615,
                        sd: 0,
                        sum: -0.021433
                    }
                },
                {
                    name: 'Mercury',
                    almanac_data: {
                        dec: 10.317662,
                        gha: 15.590898,
                        hc: 22.421148,  // altitude
                        zn: 165.229331  // azimuth
                    },
                    altitude_corrections: {
                        isCorrected: true,
                        pa: 0.000183,
                        refr: -0.021615,
                        sd: 0,
                        sum: -0.021433
                    }
                }
            ],
            stars: [
                {
                    name: 'Polaris',
                    almanac_data: {
                        dec: 89.373994,
                        gha: 314.779941,
                        hc: 48.458774,  // altitude
                        zn: 0.668178    // azimuth
                    },
                    altitude_corrections: {
                        isCorrected: true,
                        pa: 0,
                        refr: -0.014678,
                        sd: 0,
                        sum: -0.014678
                    },
                    nav_star_number: 1
                },
                {
                    name: 'Vega',
                    almanac_data: {
                        dec: 38.800855,
                        gha: 81.013399,
                        hc: 33.077857,  // altitude
                        zn: 293.211952  // azimuth
                    },
                    altitude_corrections: {
                        isCorrected: true,
                        pa: 0,
                        refr: -0.025357,
                        sd: 0,
                        sum: -0.025357
                    },
                    nav_star_number: 49
                },
                {
                    name: 'Sirius',
                    almanac_data: {
                        dec: -16.7,
                        gha: 100.2,
                        hc: 28.5,       // altitude
                        zn: 196.0       // azimuth
                    },
                    altitude_corrections: {
                        isCorrected: true,
                        pa: 0,
                        refr: -0.03,
                        sd: 0,
                        sum: -0.03
                    },
                    nav_star_number: 2
                },
                {
                    name: 'Betelgeuse',
                    almanac_data: {
                        dec: 7.410769,
                        gha: 271.32645,
                        hc: 16.494144,  // altitude
                        zn: 86.125596   // azimuth
                    },
                    altitude_corrections: {
                        isCorrected: true,
                        pa: 0,
                        refr: -0.13024,
                        sd: 0,
                        sum: -0.13024
                    },
                    nav_star_number: 16
                }
            ]
        };



        return mockData;
    }
}
