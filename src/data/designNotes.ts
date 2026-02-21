export interface DesignNote {
  component: string;
  property: string;
  rationale: string;
}

export const designNotes: DesignNote[] = [
  {
    component: 'SearchInput',
    property: 'transition: border-color 0.15s ease',
    rationale: 'Smooths the focus border appearance instead of an instant snap.',
  },
  {
    component: 'FilterButton',
    property: 'transition: border-color 0.15s ease',
    rationale: 'Smooths active/open border state change.',
  },
  {
    component: 'FilterButton',
    property: ':hover { border-color }',
    rationale: 'Gives hover feedback so users know the button is interactive.',
  },
  {
    component: 'FilterButton',
    property: 'Chevron transition: transform 0.15s ease',
    rationale: 'Animates the chevron rotation on open/close instead of an instant flip.',
  },
  {
    component: 'Checkbox',
    property: 'transition: background-color, border-color 0.15s ease',
    rationale: 'Smooths the check/uncheck visual state change.',
  },
  {
    component: 'Checkbox',
    property: ':hover { border-color }',
    rationale: 'Highlights the checkbox on hover to indicate it is clickable.',
  },
  {
    component: 'Checkbox',
    property: '@keyframes checkIn (scale 0 → 1)',
    rationale: 'Checkmark pops in with a micro-animation on check for tactile feedback.',
  },
  {
    component: 'DataTable',
    property: 'Header :hover { color change }',
    rationale: 'Indicates sortable columns are interactive on hover.',
  },
  {
    component: 'Pagination',
    property: 'Nav button :hover { color change }',
    rationale: 'Highlights enabled pagination arrows on hover.',
  },
  {
    component: 'SingleSelectFilter',
    property: 'Option :hover { background }',
    rationale: 'Highlights the hovered option row. Uses the same #F5F5F5 as the selected state from Figma.',
  },
  {
    component: 'MultiSelectFilter',
    property: 'Option row :hover { background }',
    rationale: 'Same hover highlight as SingleSelectFilter for consistency.',
  },
  {
    component: 'Both filters',
    property: '@keyframes dropdownIn (fade + slide)',
    rationale: 'Dropdown fades and slides in on open instead of appearing instantly.',
  },
  {
    component: 'Button',
    property: ':hover { opacity: 0.9 }',
    rationale: 'Subtle dim on hover for Apply / Clear All buttons.',
  },
  {
    component: 'Global',
    property: ':focus-visible { outline: 2px solid #006088 }',
    rationale: 'Keyboard focus ring for accessibility. Only visible during keyboard navigation, not mouse clicks.',
  },
];
