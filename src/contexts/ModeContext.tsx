import React from 'react';

type Mode = 'edit' | 'preview' | 'present';

const ModeContext = React.createContext<Mode>('edit');

export default ModeContext;
