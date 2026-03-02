import ProtectedRoute from "@/features/auth/components/protected-route";
import Gallery from "@/features/gallery/components/gallery";

export default function GalleryPage() {
  return (
    <ProtectedRoute>
      <Gallery />
    </ProtectedRoute>
  );
}
