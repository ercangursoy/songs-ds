export interface DesignNoteGroup {
  category: string;
  notes: string[];
}

export const designNoteGroups: DesignNoteGroup[] = [
  {
    category: "Rendering",
    notes: [
      "optimizeLegibility for better kerning",
      "Custom deceleration easing via design tokens",
      "Optional fixed table height to prevent layout shift",
      "Responsive layout: stacks on mobile, table scrolls horizontally",
      "Smooth table card height transitions via interpolate-size",
    ],
  },
  {
    category: "Accessibility",
    notes: [
      "Focus-visible ring on all interactive elements",
      "Semantic HTML: <nav> for pagination, aria-sort on columns",
      'aria-hidden + focusable="false" on decorative SVGs',
      "aria-expanded, aria-haspopup on filter triggers",
      "Keyboard nav in dropdowns: Arrow/Home/End/Enter",
      "Focus trap in modal dialogs with restore on close",
      "prefers-reduced-motion disables all animation",
    ],
  },
  {
    category: "Motion",
    notes: [
      "Dropdowns fade+slide in/out with custom easing",
      "Sort arrow rotates smoothly between directions",
      "Table rows fade in on data change",
      "Checkmark scales in on toggle",
      "Search clear button fades in/out",
      "Active press scale on buttons",
    ],
  },
];

export const totalEnhancementCount = designNoteGroups.reduce(
  (sum, group) => sum + group.notes.length,
  0,
);
