
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '../contexts/AuthContext';
import { FileText, Scan, Edit, CheckCircle, Upload, Zap, Shield } from 'lucide-react';

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: Scan,
      title: 'Smart OCR Scanning',
      description: 'Advanced optical character recognition to extract text from any document with high accuracy.',
    },
    {
      icon: Edit,
      title: 'Auto-Fill Forms',
      description: 'Automatically populate digital forms with extracted data, saving time and reducing errors.',
    },
    {
      icon: CheckCircle,
      title: 'Review & Edit',
      description: 'Review and edit extracted data before finalizing to ensure complete accuracy.',
    },
    {
      icon: Shield,
      title: 'Secure Processing',
      description: 'Your documents are processed securely with enterprise-grade encryption.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Upload Document',
      description: 'Take a photo or upload a scanned document',
      icon: Upload,
    },
    {
      number: '02',
      title: 'OCR Processing',
      description: 'Our AI extracts text and identifies form fields',
      icon: Scan,
    },
    {
      number: '03',
      title: 'Review & Edit',
      description: 'Verify and edit the extracted information',
      icon: Edit,
    },
    {
      number: '04',
      title: 'Submit Form',
      description: 'Complete and submit your digital form',
      icon: CheckCircle,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-20 text-center bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white mb-6">
              <Zap className="w-4 h-4" />
              <span className="text-sm font-medium">Powered by Advanced OCR Technology</span>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Transform Physical Forms into
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Digital Magic
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Scan documents, extract data with OCR, and automatically fill digital forms. 
            Say goodbye to manual data entry forever.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {user ? (
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
                <Link to="/dashboard">Go to Dashboard</Link>
              </Button>
            ) : (
              <>
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
                  <Link to="/register">Get Started Free</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-4">
                  <Link to="/login">Sign In</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose SmartForm?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our intelligent form processing system combines cutting-edge OCR technology 
              with user-friendly design to streamline your workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow border-0 bg-white/60 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your document processing workflow in just four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-gray-900">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Revolutionize Your Form Processing?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who have already streamlined their workflow with SmartForm
          </p>
          {!user && (
            <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4">
              <Link to="/register">Start Your Free Trial</Link>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Index;
