import dotenv from 'dotenv';
dotenv.config();

console.log('Seeding database...');

async function seed() {
    // Dynamic import to ensure env vars are loaded first
    const { db } = await import('../src/lib/db');

    try {
        // Check if jobs exist
        const existing = await db.selectFrom('job_postings').selectAll().execute();
        if (existing.length > 0) {
            console.log('Jobs already exist, skipping seed.');
            process.exit(0);
        }

        await db.insertInto('job_postings').values([
            {
                title: 'Frontend Developer',
                department: 'Engineering',
                type: 'Full-time',
                location: 'Hyderabad',
                description: 'We are looking for a skilled Frontend Developer to join our engineering team. You will be responsible for implementing visual elements and user interactions that users see and interact with in our web applications.',
                updated_at: new Date().toISOString(),
            },
            {
                title: 'UI/UX Designer',
                department: 'Design',
                type: 'Full-time',
                location: 'Hyderabad',
                description: 'We are seeking a talented UI/UX Designer to create amazing user experiences. The ideal candidate should have an eye for clean and artful design, possess superior UI skills, and be able to translate high-level requirements into interaction flows and artifacts.',
                updated_at: new Date().toISOString(),
            },
            {
                title: 'Backend Engineer',
                department: 'Engineering',
                type: 'Full-time',
                location: 'Remote',
                description: 'Join our core platform team to build scalable VR service infrastructures. Experience with Node.js/TypeScript and PostgreSQL is highly valued.',
                updated_at: new Date().toISOString(),
            }
        ]).execute();

        console.log('Seeded job postings successfully.');
        process.exit(0);
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
}

seed();
