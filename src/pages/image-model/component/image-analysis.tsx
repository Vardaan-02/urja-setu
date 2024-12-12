"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { GoogleCloundVisionAPIKey } from "../../../../APIKey";
import { Upload, FileImage, Loader2, Tag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AnimatedBackground from "./animated-background";
import { FileUpload } from "@/components/ui/file-upload";

const ImageAnalysis: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [labels, setLabels] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setLabels([]);
    }
  };

  const analyzeImage = async () => {
    setIsAnalyzing(true);

    // Helper function to create a delay
    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    try {
      const reader = new FileReader();
      reader.readAsDataURL(selectedImage);

      const processImage = new Promise<void>((resolve, reject) => {
        reader.onloadend = async () => {
          try {
            const base64Image = reader.result?.toString().split(",")[1];

            // Add a delay before sending the request
            await delay(3000);

            const response = await axios.post(
              `https://vision.googleapis.com/v1/images:annotate?key=${GoogleCloundVisionAPIKey}`,
              {
                requests: [
                  {
                    image: {
                      content: base64Image,
                    },
                    features: [
                      {
                        type: "LABEL_DETECTION",
                        maxResults: 10,
                      },
                    ],
                  },
                ],
              }
            );

            const labels = response.data.responses[0]?.labelAnnotations?.map(
              (annotation: { description: string }) => annotation.description
            );

            setLabels(labels || []);
            resolve();
          } catch (error) {
            reject(error);
          }
        };
      });

      await processImage;
    } catch (err) {
      console.error(err);
    } finally {
      setIsAnalyzing(false); // Ensure this runs after `processImage` is complete
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex justify-center items-center overflow-hidden bg-gradient-to-br from-teal-400 to-green-500">
        <AnimatedBackground />
        <Card className="w-full p-4 max-w-2xl bg-green-50/60 backdrop-blur-md shadow-xl z-10 border-none">
          <div className="shadow-2xl bg-white/30 rounded-lg">
            <CardContent className="p-6 space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-3xl font-bold text-center text-teal-800"
              >
                Image Analysis with Urja-Setu AI{" "}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-center"
              >
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />

                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex items-center justify-center w-64 h-64 border-teal-300 rounded-lg hover:border-teal-500 transition-colors duration-300 overflow-hidden"
                >
                  {previewUrl ? (
                    <motion.img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    />
                  ) : (
                    <FileUpload
                      onChange={(file) => setSelectedImage(file[0])}
                    />
                  )}
                </label>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center"
              >
                <Button
                  onClick={analyzeImage}
                  disabled={!selectedImage || isAnalyzing}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-6 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Analyze Image
                    </>
                  )}
                </Button>
              </motion.div>
              <AnimatePresence>
                {labels.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="space-y-4"
                  >
                    <h2 className="text-xl font-semibold text-teal-800 text-center">
                      Detected Labels:
                    </h2>
                    <div className="flex flex-wrap justify-center gap-2">
                      {labels
                        .filter((_, index) => index < 3)
                        .map((label, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <span className="inline-flex items-center bg-teal-100 text-teal-800 rounded-full px-3 py-1 text-sm font-medium">
                              <Tag className="w-4 h-4 mr-1" />
                              {label}
                            </span>
                          </motion.div>
                        ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ImageAnalysis;
