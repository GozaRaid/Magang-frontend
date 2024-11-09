export const initialEvents = [
  {
    id: "1",
    title: "initialtitle",
    city: "initialcity",
    date: "December 31, 2024",
    image_url:
      "http://localhost:8000/hero/images/17303760725191703776190780.jpg",
    about: "initial aboutdescription",
    conferences: [
      {
        title: "1st ICoDIS | IoP Science",
        conference_url: "https://iopscience.iop.org/article/...",
      },
      {
        title: "2nd ICoDIS | IoP Science",
        conference_url: "https://iopscience.iop.org/article/...",
      },
      {
        title: "3rd ICoDIS (ICoDSA) | IEEE Xplore",
        conference_url: "https://ieeexplore.ieee.org/document/...",
      },
      {
        title: "4th ICoDIS (ICoDSA) | IEEE Xplore",
        conference_url: "https://ieeexplore.ieee.org/document/...",
      },
      {
        title: "5th ICoDIS (ICoDSA) | IEEE Xplore",
        conference_url: "https://ieeexplore.ieee.org/document/...",
      },
      {
        title: "6th ICoDIS (ICoDSA) | IEEE Xplore",
        conference_url: "https://ieeexplore.ieee.org/document/...",
      },
    ],
    where: "initial location",
    when: "initial time",
    who: "initial speakers",
    schedule: [
      {
        date: "2024-06-15",
        items: [
          {
            timestart: "09:00 AM",
            timeend: "10:00 AM",
            title: "Registration",
            speakers: "Event Staff",
            parallelsession: "-",
          },
          {
            timestart: "10:00 AM",
            timeend: "11:00 AM",
            title: "Keynote",
            speakers: "John Smith",
            parallelsession: "-",
          },
          {
            timestart: "11:00 AM",
            timeend: "12:00 PM",
            title: "Panel Discussion",
            speakers: "Alice Johnson, Michael Lee, Sarah Wilson",
            parallelsession: "-",
          },
          {
            timestart: "12:00 PM",
            timeend: "01:00 PM",
            title: "Lunch Break",
            speakers: "N/A",
            parallelsession: "N/A",
          },
          {
            timestart: "01:00 PM",
            timeend: "02:30 PM",
            title: "Breakout Sessions",
            speakers: "David Miller, Rachel Adams",
            parallelsession: "-",
          },
          {
            timestart: "02:30 PM",
            timeend: "03:30 PM",
            title: "Product Showcase",
            speakers: "Emily Turner, James Green",
            parallelsession: "-",
          },
          {
            timestart: "03:30 PM",
            timeend: "04:30 PM",
            title: "Networking",
            speakers: "N/A",
            parallelsession: "-",
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
            speakers: "Lisa Thompson",
            parallelsession: "-",
          },
          {
            timestart: "02:00 PM",
            timeend: "03:00 PM",
            title: "Panel Discussion",
            speakers: "Robert Davis, Karen Foster",
            parallelsession: "-",
          },
          {
            timestart: "03:00 PM",
            timeend: "04:00 PM",
            title: "Tech Expo",
            speakers: "Tom Harris",
            parallelsession: "-",
          },
          {
            timestart: "04:00 PM",
            timeend: "05:00 PM",
            title: "Roundtable Discussion",
            speakers: "Anna Clark, Peter Hall",
            parallelsession: "-",
          },
        ],
      },
    ],
    parallelSessions: [
      {
        id: "1",
        date: new Date(2024, 6, 10),
        name: "Paralel Session 1A",
        papers: [
          {
            id: "1",
            paperId: "1570986224",
            title: "Machine Learning Classification Analysis",
            authors: "Caesar F. and Putu H.G.",
            mode: "Online",
          },
          {
            id: "2",
            paperId: "1570986224",
            title: "Machine Learning Classification Analysis",
            authors: "Caesar F. and Putu H.G.",
            mode: "Offline",
          },
        ],
      },
      {
        id: "2",
        date: new Date(2024, 6, 10),
        name: "Paralel Session 1B",
        papers: [
          {
            id: "1",
            paperId: "1570986224",
            title: "Machine Learning Classification Analysis",
            authors: "Caesar F. and Putu H.G.",
            mode: "Online",
          },
          {
            id: "2",
            paperId: "1570986224",
            title: "Machine Learning Classification Analysis",
            authors: "Caesar F. and Putu H.G.",
            mode: "Offline",
          },
          {
            id: "3",
            paperId: "1570986224",
            title: "Machine Learning Classification Analysis",
            authors: "Caesar F. and Putu H.G.",
            mode: "Offline",
          },
        ],
      },
    ],
    speakers: [
      {
        name: "Assoc. Prof. Dr. Hoshang Kolivand",
        bio: "School of Computer Science and Mathematics, Liverpool John Moores University, England",
        image: "/HoshangKolivand.jpg",
      },
      {
        name: "Assoc Prof. Dr. Satria Mandala",
        bio: "Director CoE Humic Engineering, Telkom University, Bandung Indonesia",
        image: "/Satrianew.jpg",
      },
      {
        name: "Prof. Hui-Min David Wang",
        bio: "Department of Chemical Engineering, Institute of Biomedical Engineering, National Chung Hsing University, Taiwan",
        image: "/HuiMinnew.jpg",
      },
      {
        name: "Prof. Dimitrios Georgakopoulos",
        bio: "Director, ARC Industrial Transformation Research Hub for Future Digital Manufacturing, Swinburne University Swinburne University of Technology, Australia",
        image: "/Dimitriosneww.jpg",
      },
    ],
    map_url:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d829.0235262254835!2d115.16517819578816!3d-8.736788974631034!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd25b478fa53ef9%3A0xf85ed5e4cbe5222b!2sASTON%20Kuta%20Hotel%20%26%20Residence!5e0!3m2!1sen!2sid!4v1728494050618!5m2!1sen!2sid",
  },
];
