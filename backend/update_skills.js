const sequelize = require('./src/config/database');
const Profile = require('./src/models/Profile');

async function updateSkills() {
  try {
    await sequelize.authenticate();
    const skills = [
      {
        category: "Keahlian",
        items: [
          "UI/UX DESIGNER",
          "QA (Quality Assurance) Engineer / Tester",
          "Business Analyst (IT)",
          "Software Developer",
          "UX Researcher",
          "Product Manager (PM)",
          "UX Writer",
          "System Analyst",
          "ERP analyst",
          "IT Support / Helpdesk",
          "Data analyst",
          "Text Writer"
        ]
      }
    ];
    
    await Profile.update({ skills }, { where: { id: 1 } });
    console.log("Skills updated successfully.");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
}
updateSkills();
