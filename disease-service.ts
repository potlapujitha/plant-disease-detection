// Mock disease detection service - replace with real Fal AI integration later
export interface DetectionResult {
  disease: string
  confidence: number
  description: string
  treatment: string
  severity: "low" | "medium" | "high"
}

const mockDiseases: Record<string, DetectionResult> = {
  "powdery-mildew": {
    disease: "Powdery Mildew",
    confidence: 0.92,
    severity: "medium",
    description: "A fungal disease that appears as a white powdery substance on plant leaves, stems, and buds.",
    treatment:
      "Apply sulfur-based fungicides every 7-10 days. Improve air circulation by pruning affected areas. Remove infected leaves.",
  },
  "leaf-spot": {
    disease: "Leaf Spot",
    confidence: 0.87,
    severity: "medium",
    description: "Brown or black spots on leaves caused by bacterial or fungal pathogens. Spots may have yellow halos.",
    treatment:
      "Remove affected leaves immediately. Apply copper fungicides weekly. Avoid overhead watering. Ensure proper spacing between plants.",
  },
  rust: {
    disease: "Rust",
    confidence: 0.89,
    severity: "high",
    description: "Orange, red, or brown pustules on the undersides of leaves. Indicates severe fungal infection.",
    treatment:
      "Remove heavily infected leaves. Apply sulfur or copper fungicides. Increase air flow. Reduce leaf wetness through proper watering.",
  },
  blight: {
    disease: "Early Blight",
    confidence: 0.91,
    severity: "high",
    description: "Brown spots with concentric rings appearing on lower leaves first, gradually moving upward.",
    treatment:
      "Remove all infected leaves and dispose of them. Apply fungicides containing chlorothalonil. Stake plants for better air circulation.",
  },
  healthy: {
    disease: "Healthy Plant",
    confidence: 0.95,
    severity: "low",
    description: "Your plant appears to be in excellent health with no visible diseases detected.",
    treatment:
      "Continue regular watering and maintenance. Provide adequate sunlight (6-8 hours daily). Monitor for any future issues.",
  },
}

export async function detectDisease(imageData: string): Promise<DetectionResult> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Mock result - in production, send image to Fal AI
  const diseases = Object.values(mockDiseases)
  const randomDisease = diseases[Math.floor(Math.random() * diseases.length)]

  return randomDisease
}
