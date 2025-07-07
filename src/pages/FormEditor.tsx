import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Save, Send, Edit3, CheckCircle, AlertTriangle, RotateCcw, Upload } from 'lucide-react';

const FormEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock extracted data from OCR
  const [formData, setFormData] = useState({
    fullName: 'John Michael Smith',
    dateOfBirth: '15/03/1985',
    email: 'john.smith@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, Apt 4B',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    idNumber: 'ID123456789',
    emergencyContact: 'Jane Smith',
    emergencyPhone: '+1 (555) 987-6543',
  });

  const [confidence, setConfidence] = useState({
    fullName: 98,
    dateOfBirth: 95,
    email: 92,
    phone: 88,
    address: 85,
    city: 97,
    state: 99,
    zipCode: 94,
    idNumber: 91,
    emergencyContact: 87,
    emergencyPhone: 89,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const getConfidenceColor = (conf: number) => {
    if (conf >= 95) return 'bg-green-100 text-green-800';
    if (conf >= 85) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  const getConfidenceIcon = (conf: number) => {
    if (conf >= 95) return <CheckCircle className="w-3 h-3" />;
    return <AlertTriangle className="w-3 h-3" />;
  };

  const handleSave = () => {
    toast.success('Form data saved successfully!');
  };

  const handleSubmit = () => {
    toast.success('Form submitted successfully!');
    navigate('/dashboard');
  };

  const handleRescan = () => {
    toast.info('Redirecting to rescan document...');
    navigate('/upload');
  };

  const handleUploadNew = () => {
    toast.info('Redirecting to upload new document...');
    navigate('/upload');
  };

  const formFields = [
    { key: 'fullName', label: 'Full Name', type: 'text' },
    { key: 'dateOfBirth', label: 'Date of Birth', type: 'text' },
    { key: 'email', label: 'Email Address', type: 'email' },
    { key: 'phone', label: 'Phone Number', type: 'tel' },
    { key: 'address', label: 'Street Address', type: 'text' },
    { key: 'city', label: 'City', type: 'text' },
    { key: 'state', label: 'State', type: 'text' },
    { key: 'zipCode', label: 'ZIP Code', type: 'text' },
    { key: 'idNumber', label: 'ID Number', type: 'text' },
    { key: 'emergencyContact', label: 'Emergency Contact', type: 'text' },
    { key: 'emergencyPhone', label: 'Emergency Phone', type: 'tel' },
  ];

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Form Editor</h1>
              <p className="text-gray-600">
                Review and edit the extracted form data before submission
              </p>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" onClick={handleRescan}>
                <RotateCcw className="w-4 h-4 mr-2" />
                Rescan
              </Button>
              <Button variant="outline" onClick={handleUploadNew}>
                <Upload className="w-4 h-4 mr-2" />
                New Upload
              </Button>
              <Button variant="outline" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handleSubmit} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Send className="w-4 h-4 mr-2" />
                Submit Form
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Fields */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Edit3 className="w-5 h-5" />
                  <span>Extracted Form Data</span>
                </CardTitle>
                <CardDescription>
                  Review and edit the automatically extracted information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {formFields.map((field) => (
                    <div key={field.key} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor={field.key}>{field.label}</Label>
                        <Badge
                          variant="secondary"
                          className={`text-xs ${getConfidenceColor(confidence[field.key as keyof typeof confidence])}`}
                        >
                          {getConfidenceIcon(confidence[field.key as keyof typeof confidence])}
                          <span className="ml-1">{confidence[field.key as keyof typeof confidence]}%</span>
                        </Badge>
                      </div>
                      <Input
                        id={field.key}
                        type={field.type}
                        value={formData[field.key as keyof typeof formData]}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        className={`${
                          confidence[field.key as keyof typeof confidence] < 85
                            ? 'border-yellow-300 bg-yellow-50'
                            : confidence[field.key as keyof typeof confidence] < 95
                            ? 'border-orange-300 bg-orange-50'
                            : 'border-green-300 bg-green-50'
                        }`}
                      />
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Add any additional notes or comments..."
                    className="mt-2"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Document Actions */}
            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Document Actions</CardTitle>
                <CardDescription>
                  Options for the current document
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleRescan}
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Rescan Current Document
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={handleUploadNew}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New Document
                </Button>
              </CardContent>
            </Card>

            {/* Confidence Summary */}
            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Extraction Summary</CardTitle>
                <CardDescription>
                  OCR confidence levels for extracted data
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Overall Accuracy</span>
                    <Badge className="bg-green-100 text-green-800">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      92.8%
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="text-green-600">High Confidence</span>
                        <span>7 fields</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '64%' }}></div>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="text-yellow-600">Medium Confidence</span>
                        <span>3 fields</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '27%' }}></div>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <div className="flex justify-between mb-1">
                        <span className="text-red-600">Low Confidence</span>
                        <span>1 field</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-red-500 h-2 rounded-full" style={{ width: '9%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Document Preview */}
            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Original Document</CardTitle>
                <CardDescription>
                  Reference the original scanned document
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-300 rounded-lg mx-auto mb-2"></div>
                      <p className="text-sm text-gray-500">Document Preview</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Full Document
                </Button>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Review Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Fields with yellow/red backgrounds need review</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Check dates are in correct format</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <p>Verify phone numbers and email addresses</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormEditor;
