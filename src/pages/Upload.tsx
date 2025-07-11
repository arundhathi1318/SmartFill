import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { Upload as UploadIcon, Camera, FileText, CheckCircle, AlertCircle, Edit3, RotateCcw } from 'lucide-react';

const Upload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isProcessed, setIsProcessed] = useState(false);
  const navigate = useNavigate();

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }

    setFile(selectedFile);
    setIsProcessed(false);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFileSelect(selectedFile);
    }
  };

  const simulateOCRProcessing = async () => {
    setIsProcessing(true);
    setProgress(0);

    // Simulate OCR processing steps
    const steps = [
      { message: 'Uploading document...', duration: 1000 },
      { message: 'Analyzing image quality...', duration: 800 },
      { message: 'Extracting text with OCR...', duration: 2000 },
      { message: 'Identifying form fields...', duration: 1500 },
      { message: 'Structuring data...', duration: 700 },
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, steps[i].duration));
      setProgress((i + 1) * 20);
    }

    setIsProcessing(false);
    setIsProcessed(true);
    toast.success('Document processed successfully!');
  };

  const handleProcess = () => {
    if (!file) {
      toast.error('Please select a file first');
      return;
    }
    simulateOCRProcessing();
  };

  const handleRescan = () => {
    setIsProcessed(false);
    setProgress(0);
    toast.info('Ready to rescan document');
  };

  const handleEditForm = () => {
    navigate('/form-editor/1');
  };

  const handleReplaceDocument = () => {
    setFile(null);
    setPreview(null);
    setIsProcessed(false);
    setProgress(0);
    toast.info('Please select a new document');
  };

  return (
    <div className="min-h-screen px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Document</h1>
          <p className="text-gray-600">
            Upload a document or take a photo to extract data automatically
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Area */}
          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <UploadIcon className="w-5 h-5" />
                <span>Select Document</span>
              </CardTitle>
              <CardDescription>
                Drag and drop your document or click to browse
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={() => document.getElementById('file-input')?.click()}
              >
                {preview ? (
                  <div className="space-y-4">
                    <img
                      src={preview}
                      alt="Preview"
                      className="max-w-full max-h-64 mx-auto rounded-lg shadow-md"
                    />
                    <p className="text-sm text-gray-600">{file?.name}</p>
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReplaceDocument();
                        }}
                      >
                        <Edit3 className="w-4 h-4 mr-1" />
                        Replace
                      </Button>
                      {isProcessed && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRescan();
                          }}
                        >
                          <RotateCcw className="w-4 h-4 mr-1" />
                          Rescan
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
                      <UploadIcon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-lg font-medium text-gray-900">
                        Drop your document here
                      </p>
                      <p className="text-sm text-gray-500">
                        or click to browse files
                      </p>
                    </div>
                    <div className="flex justify-center space-x-4">
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <Camera className="w-4 h-4" />
                        <span>Photos</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-500">
                        <FileText className="w-4 h-4" />
                        <span>Documents</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <label htmlFor="file-input" className="sr-only">Upload document</label>
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                className="hidden"
                title="Upload document"
              />

              <div className="mt-6 space-y-2 text-sm text-gray-500">
                <p>• Supported formats: JPG, PNG, HEIC</p>
                <p>• Maximum file size: 10MB</p>
                <p>• For best results, ensure good lighting and clear text</p>
              </div>
            </CardContent>
          </Card>

          {/* Processing Status */}
          <Card className="border-0 shadow-lg bg-white/60 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>Processing Status</span>
              </CardTitle>
              <CardDescription>
                Document analysis and OCR extraction progress
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!file && (
                <div className="text-center py-8">
                  <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No document selected</p>
                </div>
              )}

              {file && !isProcessing && !isProcessed && (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Ready to Process</p>
                    <p className="text-sm text-gray-500">
                      Document is ready for OCR analysis
                    </p>
                  </div>
                  <Button
                    onClick={handleProcess}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    Start Processing
                  </Button>
                </div>
              )}

              {isProcessing && (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                    <p className="font-medium text-gray-900">Processing Document</p>
                    <p className="text-sm text-gray-500">
                      Extracting text and identifying fields...
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Image uploaded</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${progress >= 40 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-gray-600">Quality analysis complete</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${progress >= 60 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-gray-600">Text extraction in progress</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${progress >= 80 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-gray-600">Field identification</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${progress >= 100 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-gray-600">Data structuring</span>
                    </div>
                  </div>
                </div>
              )}

              {isProcessed && (
                <div className="text-center py-8 space-y-4">
                  <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Processing Complete</p>
                    <p className="text-sm text-gray-500">
                      Document has been analyzed and data extracted
                    </p>
                  </div>
                  <div className="flex justify-center space-x-3">
                    <Button
                      variant="outline"
                      onClick={handleRescan}
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Rescan
                    </Button>
                    <Button
                      onClick={handleEditForm}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Form
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Upload;
