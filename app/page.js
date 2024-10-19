import Navbar from "@/components/layout/home/Navbar";
import CategorySection from "@/components/pages/users/CategorySection";
import Header from "@/components/pages/users/Header";
import HeadphonesSection from "@/components/pages/users/HeadphonesSection";

export default function Home() {
  return (
    <>
    <Navbar />
    <main className="flex min-h-screen flex-col items-center justify-between p-3 ">
   <Header />
   <CategorySection />
   <HeadphonesSection />
    </main>
    {/* <Footer */}
    </>
  );
}
