import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button"; // Assuming Button component
import { Label } from "@/components/ui/label"; // Assuming Label component
import { Upload } from "lucide-react"; // Assuming you're using lucide icons
import { useRef } from "react";

export function HeroSection({ event, editMode, handleInputChange }) {
  const fileInputRef = useRef(null);

  const triggerHeroImageUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle>Event Details</CardTitle>
      </CardHeader>
      <CardContent className="relative">
        {editMode ? (
          <>
            <div>
              <Label htmlFor="title">Event Title</Label>
              <Input
                id="title"
                name="title"
                value={event.title}
                onChange={(e) => handleInputChange(e, "title")}
                className="w-full"
              />
            </div>
            <div className="mt-4">
              <Label htmlFor="heroImage">Event Image</Label>
              <div className="flex items-center justify-center mt-2">
                <div className="relative w-full h-[200px] bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={event.heroImage}
                    alt="Event hero"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <Button
                      onClick={triggerHeroImageUpload}
                      variant="secondary"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Change Image
                    </Button>
                  </div>
                </div>
                <Input
                  ref={fileInputRef}
                  id="heroImage"
                  name="heroImage"
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleInputChange(e, "heroImage")} // Just pass the event and the field name
                  className="hidden"
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold">{event.title}</h1>
            <img
              src={event.heroImage}
              alt="Event hero"
              className="w-full h-[400px] object-cover rounded-lg mt-4"
            />
          </>
        )}
      </CardContent>
    </Card>
  );
}

// import { Input } from "@/components/ui/input";

// export function HeroSection({ event, editMode, handleInputChange }) {
//   return (
//     <section className="mb-12">
//       <div className="relative">
//         {editMode ? (
//           <>
//             <Input
//               id="heroImage"
//               name="heroImage"
//               type="file"
//               className="hidden"
//               onChange={(e) => {
//                 const file = e.target.files?.[0];
//                 if (file) {
//                   const reader = new FileReader();
//                   reader.onloadend = () => {
//                     handleInputChange({
//                       target: { name: "heroImage", value: reader.result },
//                     });
//                   };
//                   reader.readAsDataURL(file);
//                 }
//               }}
//             />
//             <label htmlFor="heroImage" className="cursor-pointer">
//               <img
//                 src={event.heroImage}
//                 alt="Event hero"
//                 className="w-full h-[400px] object-cover rounded-lg"
//               />
//             </label>
//           </>
//         ) : (
//           <img
//             src={event.heroImage}
//             alt="Event hero"
//             className="w-full h-[400px] object-cover rounded-lg"
//           />
//         )}
//         <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           {editMode ? (
//             <Input
//               name="title"
//               value={event.title}
//               onChange={(e) => handleInputChange(e, "title")}
//               className="w-3/4 text-4xl font-bold text-white bg-transparent border-b border-white"
//             />
//           ) : (
//             <h1 className="text-4xl font-bold text-white">{event.title}</h1>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
