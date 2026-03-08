import { useRef, useState } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value: string;
  onChange: (base64: string) => void;
  label: string;
  defaultImage?: string;
}

const ImageUpload = ({ value, onChange, label, defaultImage }: ImageUploadProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    // Validate file size (max 2MB for localStorage limits)
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be less than 2MB");
      return;
    }

    setIsLoading(true);

    // Compress and convert to base64
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const maxSize = 800;
        let width = img.width;
        let height = img.height;

        if (width > height && width > maxSize) {
          height = (height * maxSize) / width;
          width = maxSize;
        } else if (height > maxSize) {
          width = (width * maxSize) / height;
          height = maxSize;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        const compressed = canvas.toDataURL("image/jpeg", 0.8);
        onChange(compressed);
        setIsLoading(false);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onChange("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
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
            <Upload className="w-4 h-4 mr-2" />
            {isLoading ? "Uploading..." : value ? "Replace Image" : "Upload Image"}
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
