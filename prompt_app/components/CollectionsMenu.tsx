import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Button, Menu, MenuItem } from '@mui/material';
import { PromptData } from '../types/types';

interface CollectionsMenuProps {
    prompts: PromptData[] | null;
}

function CollectionsMenu({prompts}: CollectionsMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    if (!prompts) {
        return;
    }

    return (
      <div>
        <Button
          id='basic-button'
          size='large'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Explore Response Collections
        </Button>
        <Menu
          id='basic-menu'
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
        {prompts.map((prompt) => (
          <MenuItem
            onClick={handleClose}
            component={Link} to={`/collection/${prompt.id}`}
          >
            {prompt.prompt.slice(0, 40)}...
        </MenuItem>
        ))}
        </Menu>
      </div>
    );
}

export default CollectionsMenu;