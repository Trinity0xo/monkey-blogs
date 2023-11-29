"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "topics",
      [
        {
          name: "Ancient Civilizations",
          followersCount: 120,
          articlesCount: 45,
          slug: "ancient-civilizations",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Space Exploration",
          followersCount: 90,
          articlesCount: 30,
          slug: "space-exploration",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Innovations in Medicine",
          followersCount: 80,
          articlesCount: 25,
          slug: "medicine-innovations",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Digital Art",
          followersCount: 60,
          articlesCount: 20,
          slug: "digital-art",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Classic Literature",
          followersCount: 50,
          articlesCount: 15,
          slug: "classic-literature",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Cryptocurrencies",
          followersCount: 70,
          articlesCount: 22,
          slug: "cryptocurrencies",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Jazz Music History",
          followersCount: 45,
          articlesCount: 18,
          slug: "jazz-music-history",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Existential Philosophy",
          followersCount: 55,
          articlesCount: 12,
          slug: "existential-philosophy",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Environmental Geography",
          followersCount: 40,
          articlesCount: 10,
          slug: "environmental-geography",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Global Political Movements",
          followersCount: 65,
          articlesCount: 28,
          slug: "political-movements",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Renaissance Art",
          followersCount: 75,
          articlesCount: 35,
          slug: "renaissance-art",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Physics of Quantum Mechanics",
          followersCount: 85,
          articlesCount: 40,
          slug: "quantum-mechanics",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Augmented Reality",
          followersCount: 95,
          articlesCount: 15,
          slug: "augmented-reality",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "African Literature",
          followersCount: 55,
          articlesCount: 20,
          slug: "african-literature",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mathematics in Nature",
          followersCount: 65,
          articlesCount: 25,
          slug: "mathematics-in-nature",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Indie Music Scene",
          followersCount: 75,
          articlesCount: 30,
          slug: "indie-music",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Eastern Philosophy",
          followersCount: 45,
          articlesCount: 18,
          slug: "eastern-philosophy",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Oceanography",
          followersCount: 35,
          articlesCount: 12,
          slug: "oceanography",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "International Relations",
          followersCount: 60,
          articlesCount: 28,
          slug: "international-relations",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Impressionist Art",
          followersCount: 80,
          articlesCount: 35,
          slug: "impressionist-art",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Genetics and Gene Editing",
          followersCount: 100,
          articlesCount: 22,
          slug: "genetics-gene-editing",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Virtual Reality Technologies",
          followersCount: 70,
          articlesCount: 30,
          slug: "virtual-reality",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Middle Eastern Literature",
          followersCount: 50,
          articlesCount: 18,
          slug: "middle-eastern-literature",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Chaos Theory in Mathematics",
          followersCount: 65,
          articlesCount: 25,
          slug: "chaos-theory",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Electronic Dance Music",
          followersCount: 75,
          articlesCount: 30,
          slug: "electronic-dance-music",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Modern Philosophy",
          followersCount: 55,
          articlesCount: 20,
          slug: "modern-philosophy",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Climate Change Impacts",
          followersCount: 40,
          articlesCount: 15,
          slug: "climate-change-impacts",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Revolutionary Political Ideas",
          followersCount: 60,
          articlesCount: 28,
          slug: "revolutionary-politics",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Baroque Art Movement",
          followersCount: 75,
          articlesCount: 35,
          slug: "baroque-art",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Astrophysics",
          followersCount: 85,
          articlesCount: 40,
          slug: "astrophysics",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Blockchain Technology",
          followersCount: 95,
          articlesCount: 15,
          slug: "blockchain-technology",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("topics", null, {});
  },
};
