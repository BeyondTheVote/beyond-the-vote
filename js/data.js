/*
 * EDITING GUIDE
 * -------------
 * This is the only file you need to edit when real candidate details arrive.
 * Keep every id unique and lowercase, using hyphens instead of spaces.
 * Candidate image paths should point to compressed local files in assets/candidates/.
 */

window.CAMPAIGN_DATA = {
  campaign: {
    name: "Beyond the Vote",
    tagline: "Vote Beyond the Vote.",
    electionYear: "2026"
  },

  faculties: [
    {
      id: "msfea",
      shortName: "MSFEA",
      campaignName: "Beyond the Vote",
      fullName: "Maroun Semaan Faculty of Engineering and Architecture",
      description: "Meet the campaign’s MSFEA candidate team.",
      candidates: [
        {
          id: "msfea-jean-pierre-fadel",
          name: "Jean-Pierre B. Fadel",
          position: "USFC",
          designation: "Lead Candidate",
          image: "",
          imageAlt: "Portrait of Jean-Pierre B. Fadel",
          statement: "The candidate’s profile statement will be added here once the final campaign information is provided."
        },
        {
          id: "msfea-roy-ayyache",
          name: "Roy E. Ayyache",
          position: "USFC",
          designation: "",
          image: "assets/candidates/roy-ayyache.jpg",
          imageAlt: "Portrait of Roy E. Ayyache",
          statement: "The candidate’s profile statement will be added here once the final campaign information is provided."
        },
        {
          id: "msfea-antoine-safar",
          name: "Antoine C. Safar",
          position: "USFC",
          designation: "",
          image: "assets/candidates/antoine-safar.jpg",
          imageAlt: "Portrait of Antoine C. Safar",
          statement: "I’m a second-year ECE student. My goal is to make MSFEA a better place, to be the voice of my peers, to be the one who leads the change, to secure a better future, and to make my campaign go beyond the vote."
        }
      ]
    },
    {
      id: "osb",
      shortName: "OSB",
      campaignName: "Beyond the Vote",
      fullName: "Suliman S. Olayan School of Business",
      description: "Meet the campaign’s OSB candidate team.",
      candidates: [
        {
          id: "osb-angelo-jabre",
          name: "Angelo T. Jabre",
          position: "USFC",
          designation: "",
          image: "",
          imageAlt: "Portrait of Angelo T. Jabre",
          statement: "The candidate’s profile statement will be added here once the final campaign information is provided."
        }
      ]
    },
    {
      id: "fafs",
      shortName: "FAFS",
      campaignName: "FAFS First",
      fullName: "Faculty of Agricultural and Food Sciences",
      description: "Meet the FAFS First candidate team.",
      candidates: [
        {
          id: "fafs-cristiana-jureidini",
          name: "Cristina Z. Jureidini",
          position: "USFC",
          designation: "",
          image: "assets/candidates/cristiana-jureidini.jpg",
          imageAlt: "Portrait of Cristina Z. Jureidini",
          statement: "I’m Cristina Jureidini, an Agribusiness student running for USFC, a passionate voice for change, and someone who believes student life deserves more than just promises. I’m running to turn ideas into action, bring students’ voices to the table, and make our university experience better for everyone. Your voice, our impact."
        }
      ]
    }
  ]
};
