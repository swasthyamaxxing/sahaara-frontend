import CareTakerNavbar from "@/components/shared/CareTakerNavbar";

export default function CareTakerLayout ({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <CareTakerNavbar />
      <main className="grow">{children}</main>
    </div>
  );
};
