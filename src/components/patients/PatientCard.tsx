import { Patient } from '@/types/patient.types';

interface PatientCardProps {
  patient: Patient;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  return (
    <div className="bg-[#FFFFFF40] border rounded-2xl p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between gap-4">
        <div className="w-16 h-16 border-2 rounded-2xl bg-brand-red" />
        <div className="min-w-0 flex-1">
          <h2 className="font-bold text-lg text-brand-red truncate">{patient.name}</h2>
          <p className="text-sm text-[#554240]">Age: {patient.age}</p>
        </div>
        <div className="min-w-[3.75rem] h-6 rounded-full bg-[#FFF9D7] border px-3 text-center font-bold text-[#065F46] flex items-center justify-center">
          Stable
        </div>
      </div>

      <div>
        <div className="flex items-center border-b py-5 justify-between">
          <span className="text-[#554240]">Email</span>
          <span className="font-bold text-[#1F1B16] truncate">{patient.email}</span>
        </div>
        <div className="flex items-center py-5 justify-between">
          <span className="text-[#554240]">Assigned</span>
          <span className="font-bold text-[#641E21]">{patient.assigned_at}</span>
        </div>
      </div>

      <button className="bg-[#e1cdaa] text-brand-red w-full font-bold text-xl py-2 px-4 rounded-full hover:cursor-pointer mt-4">
        View Details
      </button>
    </div>
  );
};

export default PatientCard;