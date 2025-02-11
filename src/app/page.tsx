"use client";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { HeroSection, LoginModal, Navbar, RegisterModal } from "~/components";
import useAuthStore from "~/store/auth.store";

const Home = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setRegisterModalOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const router = useRouter();

  const token = useAuthStore((state) => !!state.token);

  useEffect(() => {
    if (token) {
      router.replace("/dashboard");
    }
  }, [token]);

  // Close mobile menu on screen resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar
        setLoginModalOpen={setLoginModalOpen}
        setRegisterModalOpen={setRegisterModalOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main className="flex-grow">
        <HeroSection setRegisterModalOpen={setRegisterModalOpen} />
      </main>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setRegisterModalOpen(false)}
      />
    </div>
  );
};

export default Home;
