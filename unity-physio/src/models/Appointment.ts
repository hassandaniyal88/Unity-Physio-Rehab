import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IAppointment extends Document {
  doctorId: string
  patientId: string
  date: Date
  status: string
}

const AppointmentSchema: Schema<IAppointment> = new Schema<IAppointment>({
  doctorId: { type: String, required: true },
  patientId: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ['pending','confirmed','completed','cancelled'], default: 'pending' }
}, { timestamps: true })

export const Appointment: Model<IAppointment> = mongoose.models.Appointment || mongoose.model<IAppointment>('Appointment', AppointmentSchema)


