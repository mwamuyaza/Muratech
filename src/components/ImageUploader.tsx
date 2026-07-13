/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  label: string;
  imageValue: string;
  onImageChange: (val: string) => void;
  placeholderUrl?: string;
}

export default function ImageUploader({
  label,
  imageValue,
  onImageChange,
  placeholderUrl = 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=600&q=80'
}: ImageUploaderProps) {
  // If the image is a data URL (Base64), default to upload mode, otherwise link mode
  const isBase64 = imageValue?.startsWith('data:');
  const [mode, setMode] = useState<'upload' | 'url'>(isBase64 || !imageValue ? 'upload' : 'url');
  const fileInputId = `file-input-${label.replace(/\s+/g, '-').toLowerCase()}`;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onImageChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <label className="text-slate-400 font-mono text-[11px] font-bold block">{label}</label>
        <div className="flex bg-slate-900 border border-slate-800 rounded-lg p-0.5 text-[10px]">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2 py-1 rounded-md font-mono font-bold transition-all cursor-pointer ${
              mode === 'upload' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Gallery Upload
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2 py-1 rounded-md font-mono font-bold transition-all cursor-pointer ${
              mode === 'url' ? 'bg-amber-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            Web Link
          </button>
        </div>
      </div>

      {mode === 'upload' ? (
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border border-dashed border-slate-800 hover:border-amber-500/50 bg-slate-900/40 rounded-xl p-4 transition-all flex flex-col items-center justify-center gap-3 relative overflow-hidden group min-h-[120px]"
        >
          {imageValue ? (
            <div className="relative w-full flex flex-col items-center gap-2">
              <img
                src={imageValue}
                alt="Upload preview"
                className="h-24 w-auto object-cover rounded-lg border border-slate-800 bg-slate-950 shadow-md"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                onClick={() => onImageChange('')}
                className="absolute top-0 right-0 p-1.5 bg-slate-950/80 hover:bg-red-500 text-white rounded-full transition-all border border-slate-800 shadow cursor-pointer"
                title="Remove photo"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10px] font-mono text-amber-500/90 text-center font-bold">
                {imageValue.startsWith('data:') ? '✓ Photo loaded from gallery' : '✓ Photo loaded from web link'}
              </span>
            </div>
          ) : (
            <>
              <input
                type="file"
                id={fileInputId}
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor={fileInputId}
                className="cursor-pointer flex flex-col items-center justify-center text-center space-y-2 w-full h-full py-3"
              >
                <div className="p-2.5 bg-slate-950 text-amber-500 rounded-xl group-hover:bg-amber-500 group-hover:text-slate-950 transition-all shadow-md">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-slate-200 font-bold text-xs">Browse Device Photo Gallery</p>
                  <p className="text-slate-500 text-[10px] mt-0.5">Drag & drop your file here or click to browse</p>
                </div>
              </label>
            </>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <input
            type="text"
            value={imageValue}
            onChange={(e) => onImageChange(e.target.value)}
            placeholder={placeholderUrl}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-amber-500 focus:bg-slate-800 transition-all font-mono"
          />
          {imageValue && (
            <div className="flex items-center gap-2 p-2 bg-slate-900/40 border border-slate-800 rounded-lg">
              <img
                src={imageValue}
                alt="URL Preview"
                className="w-10 h-10 object-cover rounded bg-slate-950 shrink-0 border border-slate-800"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = placeholderUrl;
                }}
              />
              <span className="text-[10px] font-mono text-slate-500 truncate flex-1">{imageValue}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
