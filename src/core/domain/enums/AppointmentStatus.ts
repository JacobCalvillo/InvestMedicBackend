// src/core/domain/enums/AppointmentStatus.ts
export enum AppointmentStatus {
    SCHEDULED = 1,
    CONFIRMED = 2,
    CANCELLED = 3,
    COMPLETED = 4,
    NO_SHOW = 5,
    PENDING_PAYMENT = 6,
    RESCHEDULED = 7
  }
  
  // También podemos agregar un helper para obtener nombres
  export const getAppointmentStatusName = (statusId: AppointmentStatus): string => {
    switch (statusId) {
      case AppointmentStatus.SCHEDULED:
        return 'Programada';
      case AppointmentStatus.CONFIRMED:
        return 'Confirmada';
      case AppointmentStatus.CANCELLED:
        return 'Cancelada';
      case AppointmentStatus.COMPLETED:
        return 'Completada';
      case AppointmentStatus.NO_SHOW:
        return 'No asistió';
      case AppointmentStatus.PENDING_PAYMENT:
        return 'Pendiente de pago';
      case AppointmentStatus.RESCHEDULED:
        return 'Reprogramada';
      default:
        return 'Desconocido';
    }
  };