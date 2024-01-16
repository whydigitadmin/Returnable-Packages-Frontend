import Checkbox from '@mui/material/Checkbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import * as React from 'react';

export default function Screens() {
  const [checked, setChecked] = React.useState([0]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const staticLabels = ["Masters", "Admin", "Part Study", "Inbound", "Outbound", "Sales", "Tickets", "Expenses"];

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <List sx={{ width: '50%', bgcolor: 'background.paper' }}>
        {staticLabels.slice(0, Math.ceil(staticLabels.length / 2)).map((label, index) => {
          const value = index;
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem key={value} disablePadding>
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                  <Checkbox edge="start" checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple inputProps={{ 'aria-labelledby': labelId }} />
                </ListItemIcon>
                <ListItemText id={labelId} primary={label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <List sx={{ width: '50%', bgcolor: 'background.paper' }}>
        {staticLabels.slice(Math.ceil(staticLabels.length / 2)).map((label, index) => {
          const value = Math.ceil(staticLabels.length / 2) + index;
          const labelId = `checkbox-list-label-${value}`;

          return (
            <ListItem key={value}
         disablePadding>
              <ListItemButton role={undefined} onClick={handleToggle(value)} dense>
                <ListItemIcon>
                  <Checkbox edge="start" checked={checked.indexOf(value) !== -1} tabIndex={-1} disableRipple inputProps={{ 'aria-labelledby': labelId }} />
                </ListItemIcon>
                <ListItemText id={labelId} primary={label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
