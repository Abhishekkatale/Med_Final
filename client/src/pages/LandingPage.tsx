import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Stethoscope, Users, BookOpen, MessageCircle, Award, Shield } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#f9fafb] text-gray-800 font-sans">
     <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-med-primary rounded-lg flex items-center justify-center">
                <Stethoscope className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold text-med-primary">MedConnect</span>
            </div>
            <Button 
              onClick={() => window.location.href = "/login"}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Sign In
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Connect. Learn. <span className="text-[#0077B6]">Advance Medicine.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Join the premier professional network for healthcare professionals and medical students. 
            Share knowledge, collaborate on cases, and stay updated with the latest medical advances.
          </p>
          <Button 
            size="lg"
            onClick={() => window.location.href = "/login"}
            className="bg-[#0077B6] hover:bg-[#023E8A] text-white text-lg px-8 py-4 rounded-md"
          >
            Join MedConnect Today
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-[#f0f4f8]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-16">
            Everything You Need for Professional Growth
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: <Users className="w-12 h-12 text-[#0077B6] mx-auto mb-4" />,
                title: "Professional Networking",
                desc: "Connect with doctors, specialists, and medical students worldwide. Build meaningful professional relationships.",
              },
              {
                icon: <BookOpen className="w-12 h-12 text-[#0096C7] mx-auto mb-4" />,
                title: "Curated Health Content",
                desc: "Access verified medical news, research articles, and educational content from trusted healthcare sources.",
              },
              {
                icon: <MessageCircle className="w-12 h-12 text-[#00B4D8] mx-auto mb-4" />,
                title: "Case Discussions",
                desc: "Share interesting cases, seek expert opinions, and learn from real-world medical experiences.",
              },
              {
                icon: <Award className="w-12 h-12 text-[#48CAE4] mx-auto mb-4" />,
                title: "Medical Quizzes",
                desc: "Test your knowledge with specialty-specific quizzes and track your learning progress.",
              },
              {
                icon: <Stethoscope className="w-12 h-12 text-[#0077B6] mx-auto mb-4" />,
                title: "AI Assistant",
                desc: "Get instant answers to medical questions with our AI-powered assistant trained on verified content.",
              },
              {
                icon: <Shield className="w-12 h-12 text-[#00B4D8] mx-auto mb-4" />,
                title: "Verified Sources",
                desc: "All content is sourced from trusted medical organizations like WHO, CDC, and peer-reviewed journals.",
              },
            ].map((card, index) => (
              <Card key={index} className="hover:shadow-xl transition duration-300 border border-gray-200">
                <CardContent className="p-6 text-center">
                  {card.icon}
                  <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                  <p className="text-gray-600">{card.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0077B6] text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Advance Your Medical Career?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of healthcare professionals already using MedConnect to grow their careers and improve patient care.
          </p>
          <Button 
            size="lg"
            onClick={() => window.location.href = "/api/login"}
            className="bg-white text-[#0077B6] hover:bg-gray-100 text-lg px-8 py-4 rounded-md"
          >
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center items-center space-x-2 mb-4">
            <Stethoscope className="w-6 h-6 text-white" />
            <span className="text-lg font-semibold">MedConnect</span>
          </div>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} MedConnect — Connecting healthcare professionals worldwide
          </p>
        </div>
      </footer>
    </div>
  );
}
