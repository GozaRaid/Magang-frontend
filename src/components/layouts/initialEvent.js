export const initialEvents = [
  {
    id: "1",
    title: "Tech Conference 2024",
    date: "2024-06-15",
    heroImage: "/ancient-pura.jpg?height=400&width=800",
    about: "Join us for the most innovative tech conference of the year.",
    schedule: [
      {
        date: "2024-06-15",
        items: [
          {
            timestart: "09:00 AM",
            timeend: "10:00 AM",
            title: "Registration",
            description: "Check-in and welcome coffee",
          },
          {
            timestart: "10:00 AM",
            timeend: "11:00 AM",
            title: "Keynote",
            description: "Opening remarks and keynote speech",
          },
        ],
      },
      {
        date: "2024-06-16",
        items: [
          {
            timestart: "09:30 AM",
            timeend: "02:00 PM",
            title: "Workshop",
            description: "Hands-on coding workshop",
          },
          {
            timestart: "02:00 PM",
            timeend: "03:00 PM",
            title: "Panel Discussion",
            description: "Future of AI in Tech",
          },
        ],
      },
    ],
    speakers: [
      {
        name: "Jane Doe",
        bio: "AI Research Scientist at TechCorp",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        name: "John Smith",
        bio: "Founder of StartupX",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    location: "123 Tech Avenue, San Francisco, CA 94105",
  },
];
