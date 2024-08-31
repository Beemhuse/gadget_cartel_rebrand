import Header from "@/components/pages/users/Header";
import HeadphonesSection from "@/components/pages/users/HeadphonesSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-3 ">
   <Header />
   <HeadphonesSection />
    </main>
  );
}
