import PatientNavbar from "@/components/shared/PatientNavbar";

export default function PatientLayout ({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <PatientNavbar />
      <main className="grow">{children}</main>
    </div>
  );
};
