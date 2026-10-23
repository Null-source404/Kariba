import React, { useState } from 'react';
import { X, Plus, Wrench, Sparkles, Image as ImageIcon, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { User, GearCategory, Listing } from '../types/kariba';
import { karibaService } from '../services/karibaStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onListingCreated: (listing: Listing) => void;
}

const PHOTO_PRESETS = [
  {
    name: 'Power Tool / Drill',
    url: '/src/assets/images/cordless_power_drill_1792753518315.jpg',
  },
  {
    name: 'Pressure Washer',
    url: '/src/assets/images/pressure_washer_1792753518683.jpg',
  },
  {
    name: 'Lawn & Mower',
    url: '/src/assets/images/lawn_mower_1792753520146.jpg',
  },
  {
    name: 'Camping Tent',
    url: '/src/assets/images/camping_dome_tent_1792753520333.jpg',
  },
  {
    name: 'Carpet Cleaner',
    url: '/src/assets/images/carpet_cleaner_1792753544805.jpg',
  },
  {
    name: 'Extension Ladder',
    url: '/src/assets/images/aluminum_ladder_1792753520846.jpg',
  },
];

export function CreateListingModal({ isOpen, onClose, currentUser, onListingCreated }: Props) {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<GearCategory>('diy');
  const [condition, setCondition] = useState<'Like New' | 'Excellent' | 'Good' | 'Heavy Duty'>('Excellent');
  const [pricePerHour, setPricePerHour] = useState('5.00');
  const [depositAmount, setDepositAmount] = useState('45.00');
  const [selectedPhoto, setSelectedPhoto] = useState(PHOTO_PRESETS[0].url);
  const [includedAccessories, setIncludedAccessories] = useState('Charging cable, Safety goggles, Carrying case');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newListing = karibaService.createListing(currentUser.id, {
      title: title.trim(),
      description: description.trim(),
      category,
      condition,
      price_per_hour: parseFloat(pricePerHour) || 5.0,
      deposit_amount: parseFloat(depositAmount) || 40.0,
      image_url: selectedPhoto,
      includedItems: includedAccessories.split(',').map(s => s.trim()).filter(Boolean),
      location_name: currentUser.neighborhood,
    });

    onListingCreated(newListing);
    onClose();
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#25332c]/65 backdrop-blur-xs"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ type: 'spring', damping: 26, stiffness: 340 }}
        className="bg-white rounded-3xl max-w-xl w-full border border-[#ded9cf] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        role="dialog"
        aria-labelledby="create-listing-title"
      >
        {/* Header */}
        <div className="p-5 px-6 border-b border-[#ded9cf] flex items-center justify-between bg-[#f7f3eb]/75 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#25332c] text-white flex items-center justify-center">
              <Plus size={18} className="text-[#f0c96b]" />
            </div>
            <div>
              <h2 id="create-listing-title" className="font-serif-display text-base font-bold text-[#25332c]">
                List Gear in the Neighborhood Shed
              </h2>
              <div className="text-[11px] text-[#71866f]">
                Lending as {currentUser.name} ({currentUser.neighborhood})
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1.5 text-[#25332c]/50 hover:text-[#25332c] hover:bg-black/5 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#25332c]">
              Equipment / Tool Title
            </label>
            <input
              type="text"
              required
              placeholder="e.g. DeWalt 12-Inch Miter Saw with Laser Guide"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#ded9cf] text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#25332c]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#25332c]">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as GearCategory)}
                className="w-full p-2.5 rounded-xl border border-[#ded9cf] text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#25332c]"
              >
                <option value="diy">🛠️ Workshop &amp; DIY</option>
                <option value="garden">🪴 Garden &amp; Yard</option>
                <option value="outdoor">🏕️ Outdoor &amp; Camping</option>
                <option value="cleaning">🧼 Pressure &amp; Cleaning</option>
                <option value="media">📽️ Media &amp; Events</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#25332c]">
                Item Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as any)}
                className="w-full p-2.5 rounded-xl border border-[#ded9cf] text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#25332c]"
              >
                <option value="Like New">Like New (Mint)</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good (Working fine)</option>
                <option value="Heavy Duty">Heavy Duty (Commercial)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#25332c]">
              Description &amp; Usage Instructions
            </label>
            <textarea
              required
              rows={3}
              placeholder="Describe condition, specifications, battery life, or any safety precautions..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#ded9cf] text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#25332c]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#25332c]">
                Hourly Rental Rate ($/hr)
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                required
                value={pricePerHour}
                onChange={(e) => setPricePerHour(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#ded9cf] text-xs font-mono bg-white focus:outline-none focus:ring-1 focus:ring-[#25332c]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#25332c]">
                Refundable Deposit ($)
              </label>
              <input
                type="number"
                step="5"
                min="10"
                required
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#ded9cf] text-xs font-mono bg-white focus:outline-none focus:ring-1 focus:ring-[#25332c]"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#25332c]">
              Included Accessories (Comma separated)
            </label>
            <input
              type="text"
              placeholder="e.g. 2x Batteries, Rapid Charger, Hard Case, Guide Rail"
              value={includedAccessories}
              onChange={(e) => setIncludedAccessories(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-[#ded9cf] text-xs bg-white focus:outline-none focus:ring-1 focus:ring-[#25332c]"
            />
          </div>

          {/* Photo Preset Selector */}
          <div className="space-y-2 pt-1">
            <label className="block text-xs font-bold text-[#25332c]">
              Select Photography Preview
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {PHOTO_PRESETS.map((p) => (
                <div
                  key={p.url}
                  onClick={() => setSelectedPhoto(p.url)}
                  className={`aspect-square rounded-xl overflow-hidden cursor-pointer border-2 relative ${
                    selectedPhoto === p.url ? 'border-[#d96f4b] ring-2 ring-[#d96f4b]/30' : 'border-transparent'
                  }`}
                >
                  <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                  {selectedPhoto === p.url && (
                    <div className="absolute inset-0 bg-[#d96f4b]/20 flex items-center justify-center">
                      <Check size={16} className="text-white drop-shadow" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#ded9cf]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#25332c]/70 hover:text-[#25332c] rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#25332c] hover:bg-[#1a241f] rounded-xl transition-all shadow-xs active:scale-[0.98]"
            >
              Publish to Neighborhood Shed
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
