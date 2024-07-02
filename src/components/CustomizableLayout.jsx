import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Drawer, 
  AppBar, 
  CssBaseline, 
  Toolbar, 
  List, 
  Typography, 
  Divider, 
  ListItem, 
  ListItemText,
  Switch,
  Slider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Button,
  IconButton
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { saveAs } from 'file-saver';
import './CustomizableLayout.css';

const MIN_DRAWER_WIDTH = 60;
const CustomizableLayout = () => {
  const [headerEnabled, setHeaderEnabled] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(40);
  const [maxHeaderHeight, setMaxHeaderHeight] = useState(80);
  const [headerOverlap, setHeaderOverlap] = useState(true);
  const [footerEnabled, setFooterEnabled] = useState(true);
  const [footerHeight, setFooterHeight] = useState(40);
  const [maxFooterHeight, setMaxFooterHeight] = useState(120);
  const [footerOverlap, setFooterOverlap] = useState(true);
  const [drawerPosition, setDrawerPosition] = useState('left');
  const [drawerWidth, setDrawerWidth] = useState(240);
  const [maxDrawerWidth, setMaxDrawerWidth] = useState(300);
  const [drawerMinimized, setDrawerMinimized] = useState(false);

  const headerRef = useRef(null);
  const footerRef = useRef(null);
  const drawerRef = useRef(null);
  const roundToNearest5 = (num) => Math.round(num / 5) * 5;
  const roundToNearest10 = (num) => Math.round(num / 10) * 10;
  const PreviewLayout = () => {
    const handleHeaderDrag = (e) => {
      const newHeight = roundToNearest5(e.clientY - headerRef.current.getBoundingClientRect().top);
      if (newHeight <= maxHeaderHeight) {
        setHeaderHeight(Math.max(40, newHeight));
      }
    };

    const handleFooterDrag = (e) => {
      const newHeight = roundToNearest5(footerRef.current.getBoundingClientRect().bottom - e.clientY); 
      if (newHeight <= maxFooterHeight) {
        setFooterHeight(Math.max(40, newHeight));
      }
    };

    const handleDrawerDrag = (e) => {
      let newWidth = drawerPosition === 'left' 
      ? e.clientX - drawerRef.current.getBoundingClientRect().left 
      : drawerRef.current.getBoundingClientRect().right -  e.clientX;
      newWidth = roundToNearest10(newWidth);
      // console.log(drawerPosition, newWidth)
      if (newWidth <= maxDrawerWidth) {
        setDrawerWidth(Math.max(180, newWidth)); // it's 2x small on the preview.
      }
    };

    return (
      <Paper elevation={3} className="preview-container">
        {headerEnabled && (
          <Paper 
            ref={headerRef}
            elevation={2} 
            className="preview-header" 
            style={{ 
              height: `${headerHeight}px`,
              width: !headerOverlap && `calc(100% - ${drawerWidth}px)`,
              marginLeft: drawerPosition === 'left' && !headerOverlap ? `${drawerWidth}px` : '0',
              marginRight: drawerPosition === 'right' && !headerOverlap ? `${drawerWidth}px` : '0',
            }}
          >
            <IconButton size="small" onClick={() => setDrawerMinimized(!drawerMinimized)}>
              <MenuIcon fontSize="small" />
            </IconButton>
            Header {headerHeight}px
            <div 
              className="preview-drag-handle preview-drag-handle-bottom"
              onMouseDown={(e) => {
                e.preventDefault();
                document.addEventListener('mousemove', handleHeaderDrag);
                document.addEventListener('mouseup', () => {
                  document.removeEventListener('mousemove', handleHeaderDrag);
                }, { once: true });
              }}
            />
          </Paper>
        )}
        {drawerPosition === 'left' && 
        <Box className="preview-content">
          <Paper 
            ref={drawerRef}
            elevation={1} 
            className={`preview-drawer preview-drawer-left`}
            style={{ 
              width: drawerMinimized ? `${MIN_DRAWER_WIDTH}px` : `${drawerWidth}px`,
              marginTop: headerEnabled && headerOverlap ? `${headerHeight}px` : '0',
              marginBottom: footerEnabled && footerOverlap ? `${footerHeight}px` : '0'
            }}
          >
            Drawer {drawerMinimized ? MIN_DRAWER_WIDTH : drawerWidth}px
            <div 
              className={`preview-drag-handle preview-drag-handle-right`}
              onMouseDown={(e) => {
                e.preventDefault();
                document.addEventListener('mousemove', handleDrawerDrag);
                document.addEventListener('mouseup', () => {
                  document.removeEventListener('mousemove', handleDrawerDrag);
                }, { once: true });
              }}
            />
          </Paper>
        </Box>
        }
        <Paper elevation={1} className="preview-main">
          Main Content
        </Paper>
        {drawerPosition === 'right' && 
        <Box className="preview-content">
          <Paper 
            ref={drawerRef}
            elevation={1} 
            className={`preview-drawer preview-drawer-right`}
            style={{ 
              width: drawerMinimized ? `${MIN_DRAWER_WIDTH}px` : `${drawerWidth}px`,
              marginTop: headerEnabled && headerOverlap ? `${headerHeight}px` : '0',
              marginBottom: footerEnabled && footerOverlap ? `${footerHeight}px` : '0'
            }}
          >
            Drawer {drawerMinimized ? MIN_DRAWER_WIDTH : drawerWidth}px
            <div 
              className={`preview-drag-handle preview-drag-handle-left`}
              onMouseDown={(e) => {
                e.preventDefault();
                document.addEventListener('mousemove', handleDrawerDrag);
                document.addEventListener('mouseup', () => {
                  document.removeEventListener('mousemove', handleDrawerDrag);
                }, { once: true });
              }}
            />
          </Paper>
        </Box>
        }
        {footerEnabled && (
          <Paper 
            ref={footerRef}
            elevation={2} 
            className="preview-footer"
            style={{ 
              height: `${footerHeight}px`,
              width: !footerOverlap && `calc(100% - ${drawerWidth}px)`,
              marginLeft: drawerPosition === 'left' && !footerOverlap ? `${drawerWidth}px` : '0',
              marginRight: drawerPosition === 'right' && !footerOverlap ? `${drawerWidth}px` : '0',
            }}
          >
            Footer {footerHeight}px
            <div 
              className="preview-drag-handle preview-drag-handle-top"
              onMouseDown={(e) => {
                e.preventDefault();
                document.addEventListener('mousemove', handleFooterDrag);
                document.addEventListener('mouseup', () => {
                  document.removeEventListener('mousemove', handleFooterDrag);
                }, { once: true });
              }}
            />
          </Paper>
        )}
      </Paper>
    );
  };

  const generateComponentCode = () => {
    return `import React, { useState } from 'react';
import { Box, AppBar, Drawer, Toolbar, Typography, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const CustomLayout = ({ children }) => {
  const [drawerMinimized, setDrawerMinimized] = useState(false);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      ${headerEnabled ? `
      <AppBar position="static" sx={{ 
        height: ${headerHeight},
        zIndex: (theme) => theme.zIndex.drawer + 1,
        ${headerOverlap ? '' : 'marginBottom: ' + headerHeight + ','}
      }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setDrawerMinimized(!drawerMinimized)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Header</Typography>
        </Toolbar>
      </AppBar>
      ` : ''}
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        <Drawer
          variant="permanent"
          ${drawerPosition === 'right' ? 'anchor="right"' : ''}
          sx={{
            width: drawerMinimized ? 60 : ${drawerWidth},
            flexShrink: 0,
            '& .MuiDrawer-paper': { 
              width: drawerMinimized ? 60 : ${drawerWidth}, 
              boxSizing: 'border-box',
              ${headerEnabled && !headerOverlap ? 'marginTop: ' + headerHeight + ',' : ''}
              ${footerEnabled && !footerOverlap ? 'marginBottom: ' + footerHeight + ',' : ''}
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            {/* Drawer content */}
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          ${headerEnabled ? '<Toolbar />' : ''}
          {children}
        </Box>
      </Box>
      ${footerEnabled ? `
      <AppBar position="static" sx={{ 
        top: 'auto', 
        bottom: 0, 
        height: ${footerHeight},
        zIndex: (theme) => theme.zIndex.drawer + 1,
        ${footerOverlap ? '' : 'marginTop: ' + footerHeight + ','}
      }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => setDrawerMinimized(!drawerMinimized)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="body1">Footer</Typography>
        </Toolbar>
      </AppBar>
      ` : ''}
    </Box>
  );
};

export default CustomLayout;
`;
  };

  const exportComponent = () => {
    const componentCode = generateComponentCode();
    const blob = new Blob([componentCode], { type: 'text/javascript;charset=utf-8' });
    saveAs(blob, 'CustomLayout.js');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: 300,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 300, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            <ListItem>
              <ListItemText primary="Header" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Enable" />
              <Switch
                edge="end"
                checked={headerEnabled}
                onChange={(e) => setHeaderEnabled(e.target.checked)}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Height" />
              <Slider
                value={headerHeight}
                onChange={(e, newValue) => setHeaderHeight(newValue)}
                aria-labelledby="header-height-slider"
                valueLabelDisplay="auto"
                step={5}
                marks
                min={40}
                max={80}
                sx={{ width: 100 }}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Overlap" />
              <Switch
                edge="end"
                checked={headerOverlap}
                onChange={(e) => setHeaderOverlap(e.target.checked)}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Footer" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Enable" />
              <Switch
                edge="end"
                checked={footerEnabled}
                onChange={(e) => setFooterEnabled(e.target.checked)}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Height" />
              <Slider
                value={footerHeight}
                onChange={(e, newValue) => setFooterHeight(newValue)}
                aria-labelledby="footer-height-slider"
                valueLabelDisplay="auto"
                step={5}
                marks
                min={40}
                max={120}
                sx={{ width: 100 }}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="Overlap" />
              <Switch
                edge="end"
                checked={footerOverlap}
                onChange={(e) => setFooterOverlap(e.target.checked)}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemText primary="Drawer" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Width" />
              <Slider
                value={drawerWidth}
                onChange={(e, newValue) => setDrawerWidth(newValue)}
                aria-labelledby="drawer-width-slider"
                valueLabelDisplay="auto"
                step={10}
                marks
                min={180}
                max={300}
                sx={{ width: 100 }}
              />
            </ListItem>
            <ListItem>
              <FormControl fullWidth>
                <InputLabel id="drawer-position-label">Position</InputLabel>
                <Select
                  labelId="drawer-position-label"
                  value={drawerPosition}
                  label="Position"
                  onChange={(e) => setDrawerPosition(e.target.value)}
                >
                  <MenuItem value="left">Left</MenuItem>
                  <MenuItem value="right">Right</MenuItem>
                </Select>
              </FormControl>
            </ListItem>
            <Divider />
            <ListItem>
              <Button variant="contained" color="primary" onClick={exportComponent} fullWidth>
                Export Component
              </Button>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Typography variant="h4" gutterBottom>
          Layout Preview
        </Typography>
        <PreviewLayout />
      </Box>
    </Box>
  );
};

export default CustomizableLayout;