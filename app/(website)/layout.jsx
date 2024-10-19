import Navbar from "@/components/layout/home/Navbar";

export default function Layout({ children }) {
    return (
        <main >
     
          <Navbar />
          {children}
  
        </main>
    );
  }