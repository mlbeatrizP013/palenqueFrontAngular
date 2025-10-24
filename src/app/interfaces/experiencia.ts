export interface Experiencia {
  id: number;
  nombre: string;
  fecha: string;
  hora: string;
  descripcion: string;
  asistentes: Asistente[];
  creadoEn: Date;
}

export interface Asistente {
  id: number;
  nombre: string;
  correo: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
  experienciaId: number;
  fechaSolicitud: Date;
}
