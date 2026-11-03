const sequelize = require('./src/config/database');
const Project = require('./src/models/Project');

// Fungsi untuk membersihkan JSON yang ter-encode berkali-kali
function deepUnwrap(val) {
  if (Array.isArray(val)) {
    return val.map(deepUnwrap);
  }
  if (typeof val !== 'string') return val;
  
  // Coba parse sebagai JSON berulang kali sampai tidak bisa
  let current = val;
  for (let i = 0; i < 10; i++) {
    try {
      const parsed = JSON.parse(current);
      if (typeof parsed === 'string') {
        current = parsed; // masih string, coba parse lagi
      } else if (Array.isArray(parsed)) {
        // Sekarang array — bersihkan tiap elemennya juga
        return parsed.map(deepUnwrap);
      } else {
        return parsed;
      }
    } catch {
      break; // sudah tidak bisa di-parse, ini nilai aslinya
    }
  }
  return current;
}

async function cleanProjects() {
  try {
    await sequelize.authenticate();
    const projects = await Project.findAll();
    
    for (const p of projects) {
      const cleaned = {
        tech_stack: deepUnwrap(p.tech_stack),
        challenges: deepUnwrap(p.challenges),
        features: deepUnwrap(p.features),
        gallery: deepUnwrap(p.gallery),
      };
      
      console.log(`\n--- ${p.title} ---`);
      console.log('tech_stack:', JSON.stringify(cleaned.tech_stack));
      console.log('challenges:', JSON.stringify(cleaned.challenges));
      console.log('features:', JSON.stringify(cleaned.features));
      
      await p.update(cleaned);
      console.log('✅ Updated');
    }
    
    console.log('\nAll projects cleaned successfully!');
  } catch (err) {
    console.error('Error:', err);
  } finally {
    process.exit(0);
  }
}

cleanProjects();
