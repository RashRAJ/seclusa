import { useRef, useState } from "react";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadImage } from "@/lib/content";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  defaultImage?: string;
  storagePath: string;
}

const ImageUpload = ({ value, onChange, label, defaultImage, storagePath }: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert("Image must be less than 10MB");
      return;
    }

    setIsLoading(true);
    try {
      const url = await uploadImage(file, storagePath);
      // Add cache-busting param
      onChange(url + "?t=" + Date.now());
    } catch (err) {
      console.error("Upload failed:", err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setIsLoading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const handleRemove = () => {
    onChange("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const displayImage = value || defaultImage;

  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-widest text-muted-foreground block font-sans">
        {label}
      </label>
      <div className="border border-border bg-background">
        {displayImage ? (
          <div className="relative aspect-video bg-muted">
            <img
              src={displayImage}
              alt={label}
              className="w-full h-full object-cover"
            />
            {value && (
              <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  type="button"
                  size="icon"
                  variant="destructive"
                  className="w-8 h-8 rounded-none"
                  onClick={handleRemove}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
            {!value && defaultImage && (
              <div className="absolute bottom-2 left-2 bg-background/80 px-2 py-1 text-xs text-muted-foreground">
                Default image
              </div>
            )}
          </div>
        ) : (
          <div className="aspect-video bg-muted/50 flex items-center justify-center">
            <ImageIcon className="w-12 h-12 text-muted-foreground/30" />
          </div>
        )}
        <div className="p-3 border-t border-border flex items-center justify-between gap-3">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-none flex-1"
            onClick={() => inputRef.current?.click()}
            disabled={isLoading}
          >
            {isLoading ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...</>
            ) : (
              <><Upload className="w-4 h-4 mr-2" /> {value ? "Replace Image" : "Upload Image"}</>
            )}
          </Button>
          {value && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="rounded-none text-muted-foreground"
              onClick={handleRemove}
            >
              Use Default
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
