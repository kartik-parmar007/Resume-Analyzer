import React, { useState, useRef } from 'react';
import { Upload, File, X } from 'lucide-react';

interface UploadResumeProps {
  onUpload: (text: string) => void;
}

export const UploadResume: React.FC<UploadResumeProps> = ({ onUpload }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  
  const handleDragLeave = () => {
    setIsDragging(false);
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    if (file.type === 'application/pdf' || file.type === 'text/plain' || 
        file.name.endsWith('.docx') || file.name.endsWith('.doc')) {
      setFile(file);
      const reader = new FileReader();
      
      reader.onload = (e) => {
        const text = e.target?.result as string;
        setResumeText(text);
      };
      
      reader.readAsText(file);
    } else {
      alert('Please upload a PDF, DOC, DOCX, or TXT file');
    }
  };
  
  const handleRemoveFile = () => {
    setFile(null);
    setResumeText('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resumeText && resumeText.trim() !== '') {
      onUpload(resumeText);
    } else if (!file) {
      // If no file is uploaded but there's text in the textarea
      onUpload(resumeText);
    }
  };
  
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
        Upload Your Resume
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div 
          className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center transition-colors ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!file ? (
            <>
              <Upload className="h-12 w-12 text-blue-500 mb-4" />
              <p className="text-gray-700 mb-4 text-center">
                Drag and drop your resume file here, or click to select
              </p>
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.doc,.docx,.txt"
                onChange={handleFileChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Select File
              </button>
            </>
          ) : (
            <div className="w-full flex items-center justify-between bg-gray-100 p-4 rounded-md">
              <div className="flex items-center">
                <File className="h-6 w-6 text-blue-500 mr-2" />
                <span className="text-gray-700 truncate max-w-xs">{file.name}</span>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-gray-500 hover:text-red-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-6">
          <label className="block text-gray-700 mb-2">
            Or paste your resume text:
          </label>
          <textarea
            className="w-full h-64 p-4 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Paste your resume content here..."
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
          />
        </div>
        
        <div className="mt-6 flex justify-center">
          <button
            type="submit"
            disabled={!file && resumeText.trim() === ''}
            className={`px-6 py-3 rounded-md text-white font-medium transition-colors ${
              file || resumeText.trim() !== '' 
                ? 'bg-blue-600 hover:bg-blue-700' 
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Analyze Resume
          </button>
        </div>
      </form>
    </div>
  );
};