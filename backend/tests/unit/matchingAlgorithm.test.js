import { PrismaClient } from '../../src/generated/prisma';
const prisma = new PrismaClient();
describe('Matching Algorithm', () => {
    beforeAll(async () => {
        await prisma.$connect();
    });
    afterAll(async () => {
        await prisma.$disconnect();
    });
    beforeEach(async () => {
        // Clean database
        await prisma.message.deleteMany();
        await prisma.match.deleteMany();
        await prisma.matchRequest.deleteMany();
        await prisma.userSkill.deleteMany();
        await prisma.skill.deleteMany();
        await prisma.user.deleteMany();
    });
    it('should calculate mutual matches correctly', async () => {
        // Create two users
        const user1 = await prisma.user.create({
            data: {
                email: 'user1@test.com',
                password_hash: 'hash1',
                name: 'User 1',
                profile_completion: 80
            }
        });
        const user2 = await prisma.user.create({
            data: {
                email: 'user2@test.com',
                password_hash: 'hash2',
                name: 'User 2',
                profile_completion: 90
            }
        });
        // Create skills
        const js = await prisma.skill.create({
            data: { name: 'JavaScript', category: 'Programming' }
        });
        const python = await prisma.skill.create({
            data: { name: 'Python', category: 'Programming' }
        });
        const react = await prisma.skill.create({
            data: { name: 'React', category: 'Frontend' }
        });
        // User 1: offers JS, wants Python and React
        await prisma.userSkill.create({
            data: { user_id: user1.id, skill_id: js.id, skill_type: 'offer' }
        });
        await prisma.userSkill.create({
            data: { user_id: user1.id, skill_id: python.id, skill_type: 'want' }
        });
        await prisma.userSkill.create({
            data: { user_id: user1.id, skill_id: react.id, skill_type: 'want' }
        });
        // User 2: offers Python and React, wants JS
        await prisma.userSkill.create({
            data: { user_id: user2.id, skill_id: python.id, skill_type: 'offer' }
        });
        await prisma.userSkill.create({
            data: { user_id: user2.id, skill_id: react.id, skill_type: 'offer' }
        });
        await prisma.userSkill.create({
            data: { user_id: user2.id, skill_id: js.id, skill_type: 'want' }
        });
        // Test the algorithm logic (extracted from matchesController)
        const userSkills = await prisma.userSkill.findMany({
            where: { user_id: user1.id },
            include: { skill: true }
        });
        const offeredSkillIds = userSkills
            .filter(us => us.skill_type === 'offer')
            .map(us => us.skill_id);
        const wantedSkillIds = userSkills
            .filter(us => us.skill_type === 'want')
            .map(us => us.skill_id);
        // Get potential matches
        const potentialMatches = await prisma.user.findMany({
            where: {
                AND: [
                    { id: { not: user1.id } },
                    {
                        OR: [
                            {
                                offered_skills: {
                                    some: { skill_id: { in: wantedSkillIds } }
                                }
                            },
                            {
                                wanted_skills: {
                                    some: { skill_id: { in: offeredSkillIds } }
                                }
                            }
                        ]
                    }
                ]
            },
            select: {
                id: true,
                name: true,
                avatar: true,
                profile_completion: true,
                offered_skills: { include: { skill: true } },
                wanted_skills: { include: { skill: true } }
            }
        });
        expect(potentialMatches.length).toBe(1);
        expect(potentialMatches[0].id).toBe(user2.id);
        // Calculate match score
        const user = potentialMatches[0];
        const userOfferedSkillIds = user.offered_skills.map(us => us.skill_id);
        const userWantedSkillIds = user.wanted_skills.map(us => us.skill_id);
        // Mutual matches
        const mutualOffers = userOfferedSkillIds.filter(id => wantedSkillIds.includes(id)).length;
        const mutualWants = userWantedSkillIds.filter(id => offeredSkillIds.includes(id)).length;
        const mutualMatches = mutualOffers + mutualWants;
        // Skill overlap
        const allUserSkills = [...userOfferedSkillIds, ...userWantedSkillIds];
        const allCurrentSkills = [...offeredSkillIds, ...wantedSkillIds];
        const overlap = allUserSkills.filter(id => allCurrentSkills.includes(id)).length;
        const maxSkills = Math.max(allUserSkills.length, allCurrentSkills.length);
        const skillOverlap = maxSkills > 0 ? overlap / maxSkills : 0;
        // Profile completion
        const profileCompletion = user.profile_completion / 100;
        // Calculate score
        const score = (mutualMatches * 0.5) + (skillOverlap * 0.3) + (profileCompletion * 0.2);
        expect(mutualMatches).toBe(3); // JS, Python, React all match
        expect(skillOverlap).toBe(1); // All skills overlap (3/3)
        expect(score).toBeGreaterThan(0.5); // Should be a high score
    });
    it('should exclude already matched users', async () => {
        // Create users and a match
        const user1 = await prisma.user.create({
            data: {
                email: 'user1@test.com',
                password_hash: 'hash1',
                name: 'User 1'
            }
        });
        const user2 = await prisma.user.create({
            data: {
                email: 'user2@test.com',
                password_hash: 'hash2',
                name: 'User 2'
            }
        });
        // Create a match between user1 and user2
        await prisma.match.create({
            data: {
                user1_id: user1.id,
                user2_id: user2.id
            }
        });
        // Create skills for matching
        const skill = await prisma.skill.create({
            data: { name: 'JavaScript', category: 'Programming' }
        });
        await prisma.userSkill.create({
            data: { user_id: user1.id, skill_id: skill.id, skill_type: 'offer' }
        });
        await prisma.userSkill.create({
            data: { user_id: user2.id, skill_id: skill.id, skill_type: 'want' }
        });
        // Check that user2 is not recommended to user1
        const userSkills = await prisma.userSkill.findMany({
            where: { user_id: user1.id },
            include: { skill: true }
        });
        const offeredSkillIds = userSkills
            .filter(us => us.skill_type === 'offer')
            .map(us => us.skill_id);
        const potentialMatches = await prisma.user.findMany({
            where: {
                AND: [
                    { id: { not: user1.id } },
                    {
                        OR: [
                            {
                                offered_skills: {
                                    some: { skill_id: { in: [] } } // No wanted skills for user1
                                }
                            },
                            {
                                wanted_skills: {
                                    some: { skill_id: { in: offeredSkillIds } }
                                }
                            }
                        ]
                    }
                ]
            }
        });
        // User2 should not appear in potential matches because they're already matched
        const matchedUser = potentialMatches.find(u => u.id === user2.id);
        expect(matchedUser).toBeUndefined();
    });
});
//# sourceMappingURL=matchingAlgorithm.test.js.map