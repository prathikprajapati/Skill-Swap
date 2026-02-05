import { useState } from "react";
import { Input } from "@/app/components/ui/skill-swap-input";
import { Select } from "@/app/components/ui/skill-swap-select";
import { Button } from "@/app/components/ui/skill-swap-button";
import { SkillChip } from "@/app/components/ui/skill-chip";
import { ThemeSelector } from "@/app/components/ThemeSelector";
import { currentUser } from "@/app/data/mockData";
import { X, User, Award, Target, Plus, CheckCircle, Palette } from "lucide-react";

export function ProfilePage() {
  const [offeredSkills, setOfferedSkills] = useState(currentUser.offeredSkills);
  const [wantedSkills, setWantedSkills] = useState(currentUser.wantedSkills);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState("");
  const [newSkillType, setNewSkillType] = useState<"offer" | "want">("offer");
  const [newSkillLevel, setNewSkillLevel] = useState("beginner");
  const [showSuccessFeedback, setShowSuccessFeedback] = useState(false);

  const handleRemoveSkill = (skill: string, type: "offer" | "want") => {
    if (type === "offer") {
      setOfferedSkills(offeredSkills.filter((s) => s !== skill));
    } else {
      setWantedSkills(wantedSkills.filter((s) => s !== skill));
    }
  };

  const handleAddSkill = () => {
    if (!newSkillName.trim()) return;

    if (newSkillType === "offer") {
      setOfferedSkills([...offeredSkills, newSkillName]);
    } else {
      setWantedSkills([...wantedSkills, newSkillName]);
    }

    setNewSkillName("");
    setNewSkillLevel("beginner");
    setShowAddSkillModal(false);
    
    // Show success feedback
    setShowSuccessFeedback(true);
    setTimeout(() => setShowSuccessFeedback(false), 2000);
  };

  return (
    <div className="max-w-[1000px]">
      <div className="mb-8">
        <h2 
          className="text-[32px] mb-2"
          style={{ color: 'var(--text-primary)', fontWeight: 600 }}
        >
          Your Profile
        </h2>
        <p 
          className="text-[16px]"
          style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}
        >
          Manage your information, skills, and appearance preferences
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Profile Info */}
        <div className="col-span-8 space-y-6">
          {/* Basic Information Section */}
          <div 
            className="p-6 rounded-xl border transition-all duration-300 hover:shadow-md"
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <User className="w-5 h-5" style={{ color: 'var(--primary)' }} />
              <h3 
                className="text-[18px]"
                style={{ color: 'var(--text-primary)', fontWeight: 600 }}
              >
                Basic Information
              </h3>
            </div>

            <div className="space-y-4">
              <Input
                label="Full Name"
                defaultValue={currentUser.name}
                placeholder="Enter your name"
              />
              
              <Input
                label="Email"
                type="email"
                defaultValue={currentUser.email}
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Offered Skills Section */}
          <div 
            className="p-6 rounded-xl border transition-all duration-300 hover:shadow-md"
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Award className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                <h3 
                  className="text-[18px]"
                  style={{ color: 'var(--text-primary)', fontWeight: 600 }}
                >
                  Skills You Can Teach
                </h3>
              </div>
              <Button 
                onClick={() => {
                  setNewSkillType("offer");
                  setShowAddSkillModal(true);
                }}
                size="sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Skill
              </Button>
            </div>

            {offeredSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {offeredSkills.map((skill) => (
                  <SkillChip
                    key={skill}
                    skill={skill}
                    type="offer"
                    onRemove={() => handleRemoveSkill(skill, "offer")}
                  />
                ))}
              </div>
            ) : (
              <div 
                className="text-center py-8 rounded-lg"
                style={{ backgroundColor: 'var(--section-bg)' }}
              >
                <Award className="w-12 h-12 mx-auto mb-3 opacity-30" style={{ color: 'var(--text-secondary)' }} />
                <p style={{ color: 'var(--text-secondary)' }} className="text-[14px] mb-2">
                  No skills added yet
                </p>
                <p style={{ color: 'var(--text-disabled)' }} className="text-[12px]">
                  Add at least one skill to get matched with learners
                </p>
              </div>
            )}
          </div>

          {/* Wanted Skills Section */}
          <div 
            className="p-6 rounded-xl border transition-all duration-300 hover:shadow-md"
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Target className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                <h3 
                  className="text-[18px]"
                  style={{ color: 'var(--text-primary)', fontWeight: 600 }}
                >
                  Skills You Want to Learn
                </h3>
              </div>
              <Button 
                onClick={() => {
                  setNewSkillType("want");
                  setShowAddSkillModal(true);
                }}
                size="sm"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Skill
              </Button>
            </div>

            {wantedSkills.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {wantedSkills.map((skill) => (
                  <SkillChip
                    key={skill}
                    skill={skill}
                    type="want"
                    onRemove={() => handleRemoveSkill(skill, "want")}
                  />
                ))}
              </div>
            ) : (
              <div 
                className="text-center py-8 rounded-lg"
                style={{ backgroundColor: 'var(--section-bg)' }}
              >
                <Target className="w-12 h-12 mx-auto mb-3 opacity-30" style={{ color: 'var(--text-secondary)' }} />
                <p style={{ color: 'var(--text-secondary)' }} className="text-[14px] mb-2">
                  No skills added yet
                </p>
                <p style={{ color: 'var(--text-disabled)' }} className="text-[12px]">
                  Add skills you want to learn to find teachers
                </p>
              </div>
            )}
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-3">
            <Button variant="outline">
              Cancel
            </Button>
            <Button>
              <CheckCircle className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Right Column - Theme Selector */}
        <div className="col-span-4">
          <div 
            className="p-6 rounded-xl border sticky top-24 transition-all duration-300 hover:shadow-md"
            style={{
              backgroundColor: 'var(--card)',
              borderColor: 'var(--border)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Palette className="w-5 h-5" style={{ color: 'var(--accent-indigo)' }} />
              <h3 
                className="text-[18px]"
                style={{ color: 'var(--text-primary)', fontWeight: 600 }}
              >
                Choose Theme
              </h3>
            </div>
            <ThemeSelector />
          </div>
        </div>
      </div>

      {/* Success Feedback */}
      {showSuccessFeedback && (
        <div 
          className="fixed bottom-8 right-8 px-6 py-4 rounded-xl shadow-lg animate-in slide-in-from-bottom-4 fade-in flex items-center gap-3 z-50"
          style={{
            backgroundColor: 'var(--success)',
            color: 'white',
          }}
        >
          <CheckCircle className="w-5 h-5" />
          <span className="font-medium">Skill added successfully! 🎯</span>
        </div>
      )}

      {/* Add Skill Modal */}
      {showAddSkillModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setShowAddSkillModal(false)}
        >
          <div 
            className="w-full max-w-[480px] p-6 rounded-2xl shadow-2xl animate-in zoom-in-95 fade-in duration-200"
            style={{
              backgroundColor: 'var(--card)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 
                className="text-[24px]"
                style={{ color: 'var(--text-primary)', fontWeight: 600 }}
              >
                Add New Skill
              </h3>
              <button
                onClick={() => setShowAddSkillModal(false)}
                className="p-2 hover:bg-[var(--secondary)] rounded-lg transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
              </button>
            </div>

            <div className="space-y-5">
              <Input
                label="Skill Name"
                placeholder="e.g., JavaScript, Photography, Spanish"
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
              />

              <Select
                label="Skill Level"
                value={newSkillLevel}
                onChange={(e) => setNewSkillLevel(e.target.value)}
                options={[
                  { value: "beginner", label: "Beginner" },
                  { value: "intermediate", label: "Intermediate" },
                  { value: "expert", label: "Expert" },
                ]}
              />

              <div>
                <p 
                  className="text-[14px] mb-3"
                  style={{ color: 'var(--text-primary)', fontWeight: 600 }}
                >
                  Type
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setNewSkillType("offer")}
                    className="px-4 py-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      backgroundColor: newSkillType === "offer" ? 'var(--accent-light)' : 'var(--card)',
                      borderColor: newSkillType === "offer" ? 'var(--accent)' : 'var(--border)',
                      color: newSkillType === "offer" ? 'var(--accent)' : 'var(--text-secondary)',
                      fontWeight: newSkillType === "offer" ? 600 : 400,
                    }}
                  >
                    <Award className="w-5 h-5 mx-auto mb-2" />
                    I Can Teach
                  </button>
                  <button
                    onClick={() => setNewSkillType("want")}
                    className="px-4 py-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02]"
                    style={{
                      backgroundColor: newSkillType === "want" ? 'var(--primary-light)' : 'var(--card)',
                      borderColor: newSkillType === "want" ? 'var(--primary)' : 'var(--border)',
                      color: newSkillType === "want" ? 'var(--primary)' : 'var(--text-secondary)',
                      fontWeight: newSkillType === "want" ? 600 : 400,
                    }}
                  >
                    <Target className="w-5 h-5 mx-auto mb-2" />
                    I Want to Learn
                  </button>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handleAddSkill} className="flex-1">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
                <Button 
                  onClick={() => setShowAddSkillModal(false)} 
                  variant="outline" 
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
