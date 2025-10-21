console.log('Game.js loaded');

// User Session
const userSession = {
    username: null,
    authenticated: false
};

// Game State
const gameState = {
    currentLevel: 1,
    puzzlePieces: 0,
    maxLevel: 50,
    gameActive: false,
    transitioning: false,
    transitionFrames: 0,
    transitionDelay: 30, // 30 frames = about 0.5 seconds at 60fps
    paused: false
};

// ===== SAVE SYSTEM =====

function saveProgress() {
    if (!userSession.authenticated || !userSession.username) {
        console.error('Cannot save: user not authenticated');
        return;
    }

    const saveData = {
        currentLevel: gameState.currentLevel,
        puzzlePieces: gameState.puzzlePieces,
        lastSaved: new Date().toISOString()
    };

    const userKey = `sawyer_save_${userSession.username}`;
    localStorage.setItem(userKey, JSON.stringify(saveData));
    console.log('Progress saved for', userSession.username, saveData);
}

function loadProgress() {
    if (!userSession.authenticated || !userSession.username) {
        console.error('Cannot load: user not authenticated');
        return null;
    }

    const userKey = `sawyer_save_${userSession.username}`;
    const savedData = localStorage.getItem(userKey);

    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            console.log('Progress loaded for', userSession.username, data);
            return data;
        } catch (e) {
            console.error('Error loading save data:', e);
            return null;
        }
    }

    return null;
}

function createAccount(username, pin) {
    if (!username || username.length < 3) {
        return { success: false, message: 'Username must be at least 3 characters' };
    }

    if (!pin || pin.length !== 4 || !/^\d{4}$/.test(pin)) {
        return { success: false, message: 'PIN must be exactly 4 digits' };
    }

    const accountKey = `sawyer_account_${username}`;

    // Check if account already exists
    if (localStorage.getItem(accountKey)) {
        return { success: false, message: 'Username already exists' };
    }

    // Create new account
    const accountData = {
        username: username,
        pin: pin, // In a real app, this should be hashed!
        createdAt: new Date().toISOString()
    };

    localStorage.setItem(accountKey, JSON.stringify(accountData));
    return { success: true, message: 'Account created successfully!' };
}

function authenticateUser(username, pin) {
    if (!username || !pin) {
        return { success: false, message: 'Please enter username and PIN' };
    }

    const accountKey = `sawyer_account_${username}`;
    const accountData = localStorage.getItem(accountKey);

    if (!accountData) {
        return { success: false, message: 'Account not found' };
    }

    try {
        const account = JSON.parse(accountData);
        if (account.pin === pin) {
            userSession.username = username;
            userSession.authenticated = true;
            return { success: true, message: 'Login successful!' };
        } else {
            return { success: false, message: 'Incorrect PIN' };
        }
    } catch (e) {
        console.error('Error reading account data:', e);
        return { success: false, message: 'Error loading account' };
    }
}

function logout() {
    userSession.username = null;
    userSession.authenticated = false;
    gameState.gameActive = false;
    gameState.paused = false;
}

// Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

console.log('Canvas:', canvas);
console.log('Context:', ctx);

// Load Character SVG
const characterImage = new Image();
characterImage.src = 'character.svg';

// Load Tutorial Sawyer SVG (big Sawyer for level 1)
const tutorialSawyer = new Image();
tutorialSawyer.src = 'Sawyer.svg';

// Load Level 1 Background SVG
const level1Background = new Image();
level1Background.src = 'level1-bg.svg';

// Load Level 2 Background SVG
const level2Background = new Image();
level2Background.src = 'level2-bg.svg';

// Load Level 3 Background SVG
const level3Background = new Image();
level3Background.src = 'level3-bg.svg';

// Load Level 4 Background SVG
const level4Background = new Image();
level4Background.src = 'level4-bg.svg';

// Load Level 5 Background SVG
const level5Background = new Image();
level5Background.src = 'level5-bg.svg';

// Load Level 6 Background SVG
const level6Background = new Image();
level6Background.src = 'level6-bg.svg';

// Load Level 7 Background SVG
const level7Background = new Image();
level7Background.src = 'level7-bg.svg';

// Load Level 8 Background SVG
const level8Background = new Image();
level8Background.src = 'level8-bg.svg';

// Load Level 9 Background SVG
const level9Background = new Image();
level9Background.src = 'level9-bg.svg';

// Load Level 10 Background SVG
const level10Background = new Image();
level10Background.src = 'level10-bg.svg';

// Load Level 11 Background SVG
const level11Background = new Image();
level11Background.src = 'level11-bg.svg';

// Load Level 12 Background SVG
const level12Background = new Image();
level12Background.src = 'level12-bg.svg';

// Load Level 13 Background SVG
const level13Background = new Image();
level13Background.src = 'level13-bg.svg';

// Load Level 14 Background SVG
const level14Background = new Image();
level14Background.src = 'level14-bg.svg';

// Load Level 15 Background SVG
const level15Background = new Image();
level15Background.src = 'level15-bg.svg';

// Load Level 16 Background SVG
const level16Background = new Image();
level16Background.src = 'level16-bg.svg';

// Load Level 17 Background SVG
const level17Background = new Image();
level17Background.src = 'level17-bg.svg';

// Load Level 18 Background SVG
const level18Background = new Image();
level18Background.src = 'level18-bg.svg';

// Load Level 19 Background SVG
const level19Background = new Image();
level19Background.src = 'level19-bg.svg';

// Load Level 20 Background SVG
const level20Background = new Image();
level20Background.src = 'level20-bg.svg';

// Load Level 21 Background SVG
const level21Background = new Image();
level21Background.src = 'level21-bg.svg';

// Load Level 22 Background SVG
const level22Background = new Image();
level22Background.src = 'level22-bg.svg';

// Load Level 23 Background SVG
const level23Background = new Image();
level23Background.src = 'level23-bg.svg';

// Load Level 24 Background SVG
const level24Background = new Image();
level24Background.src = 'level24-bg.svg';

// Load Level 25 Background SVG
const level25Background = new Image();
level25Background.src = 'level25-bg.svg';

// Load Level 26 Background SVG
const level26Background = new Image();
level26Background.src = 'level26-bg.svg';

// Load Level 27 Background SVG
const level27Background = new Image();
level27Background.src = 'level27-bg.svg';

// Load Level 28 Background SVG
const level28Background = new Image();
level28Background.src = 'level28-bg.svg';

// Load Level 29 Background SVG
const level29Background = new Image();
level29Background.src = 'level29-bg.svg';

// Load Level 30 Background SVG
const level30Background = new Image();
level30Background.src = 'level30-bg.svg';

// Load Level 31 Background SVG
const level31Background = new Image();
level31Background.src = 'level31-bg.svg';

// Load Level 32 Background SVG
const level32Background = new Image();
level32Background.src = 'level32-bg.svg';

// Load Level 33 Background SVG
const level33Background = new Image();
level33Background.src = 'level33-bg.svg';

// Load Level 34 Background SVG
const level34Background = new Image();
level34Background.src = 'level34-bg.svg';

// Load Level 35 Background SVG
const level35Background = new Image();
level35Background.src = 'level35-bg.svg';

// Load Level 36 Background SVG
const level36Background = new Image();
level36Background.src = 'level36-bg.svg';

// Load Level 37 Background SVG
const level37Background = new Image();
level37Background.src = 'level37-bg.svg';

// Load Level 38 Background SVG
const level38Background = new Image();
level38Background.src = 'level38-bg.svg';

// Load Level 39 Background SVG
const level39Background = new Image();
level39Background.src = 'level39-bg.svg';

// Load Level 40 Background SVG
const level40Background = new Image();
level40Background.src = 'level40-bg.svg';

// Load Level 41 Background SVG
const level41Background = new Image();
level41Background.src = 'level41-bg.svg';

// Load Level 42 Background SVG
const level42Background = new Image();
level42Background.src = 'level42-bg.svg';

// Load Level 43 Background SVG
const level43Background = new Image();
level43Background.src = 'level43-bg.svg';

// Load Level 44 Background SVG
const level44Background = new Image();
level44Background.src = 'level44-bg.svg';

// Load Level 45 Background SVG
const level45Background = new Image();
level45Background.src = 'level45-bg.svg';

// Load Level 46 Background SVG
const level46Background = new Image();
level46Background.src = 'level46-bg.svg';

// Load Level 47 Background SVG
const level47Background = new Image();
level47Background.src = 'level47-bg.svg';

// Load Level 48 Background SVG
const level48Background = new Image();
level48Background.src = 'level48-bg.svg';

// Load Level 49 Background SVG
const level49Background = new Image();
level49Background.src = 'level49-bg.svg';

// Load Level 50 Background SVG
const level50Background = new Image();
level50Background.src = 'level50-bg.svg';

// Load Puzzle Piece SVG
const puzzlePieceImage = new Image();
puzzlePieceImage.src = 'puzzle-piece.svg';

// Player (Chocolate Dog)
const player = {
    x: 40,
    y: 40,
    width: 44,  // Increased by 45% (30 * 1.45 = 43.5, rounded to 44)
    height: 44, // Increased by 45% (30 * 1.45 = 43.5, rounded to 44)
    speed: 5,
    jumpPower: 13,
    velocityY: 0,
    velocityX: 0,
    gravity: 0.7,
    isJumping: false,
    onGround: false,
    canWallKick: false,
    touchingWallSide: null,
    direction: 'right',
    wallSliding: false,
    wallSlideSpeed: 2
};

// Controls
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowLeft: false,
    ArrowRight: false
};

// Maze Configuration
let maze = [];
let cellSize = 40;
let cols, rows;
let puzzlePiece = null;

// ===== LOGIN HANDLERS =====
document.getElementById('loginBtn').addEventListener('click', function() {
    const username = document.getElementById('username').value.trim();
    const pin = document.getElementById('pin').value;
    const errorEl = document.getElementById('loginError');

    const result = authenticateUser(username, pin);

    if (result.success) {
        errorEl.textContent = '';
        errorEl.style.color = '';
        showHomepage();
    } else {
        errorEl.textContent = result.message;
        errorEl.style.color = '#ff4444';
    }
});

document.getElementById('newAccountBtn').addEventListener('click', function() {
    const username = document.getElementById('username').value.trim();
    const pin = document.getElementById('pin').value;
    const errorEl = document.getElementById('loginError');

    const result = createAccount(username, pin);

    if (result.success) {
        errorEl.textContent = result.message;
        errorEl.style.color = '#44ff44';
        // Auto-login after account creation
        setTimeout(() => {
            const authResult = authenticateUser(username, pin);
            if (authResult.success) {
                showHomepage();
            } else {
                errorEl.textContent = 'Account created but login failed. Please try logging in.';
                errorEl.style.color = '#ff4444';
            }
        }, 1000);
    } else {
        errorEl.textContent = result.message;
        errorEl.style.color = '#ff4444';
    }
});

// Allow Enter key for login
document.getElementById('pin').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('loginBtn').click();
    }
});

function showHomepage() {
    console.log('Showing homepage for user:', userSession.username);
    document.getElementById('loginScreen').classList.remove('active');
    document.getElementById('homepage').classList.add('active');

    // Display username and progress
    document.getElementById('displayUsername').textContent = userSession.username;

    const savedData = loadProgress();
    console.log('Saved data:', savedData);
    if (savedData) {
        document.getElementById('savedLevel').textContent = savedData.currentLevel;
        document.getElementById('savedPieces').textContent = savedData.puzzlePieces;
        document.getElementById('continueBtn').style.display = 'inline-block';
    } else {
        document.getElementById('savedLevel').textContent = '1';
        document.getElementById('savedPieces').textContent = '0';
        document.getElementById('continueBtn').style.display = 'none';
    }
}

// ===== HOMEPAGE HANDLERS =====
document.getElementById('continueBtn').addEventListener('click', function() {
    const savedData = loadProgress();
    if (savedData) {
        gameState.currentLevel = savedData.currentLevel;
        gameState.puzzlePieces = savedData.puzzlePieces;
    }

    document.getElementById('homepage').classList.remove('active');
    document.getElementById('gameScreen').classList.add('active');
    startGame();
});

document.getElementById('newGameBtn').addEventListener('click', function() {
    gameState.currentLevel = 1;
    gameState.puzzlePieces = 0;

    document.getElementById('homepage').classList.remove('active');
    document.getElementById('gameScreen').classList.add('active');
    startGame();
});

document.getElementById('logoutBtn').addEventListener('click', function() {
    logout();
    document.getElementById('homepage').classList.remove('active');
    document.getElementById('loginScreen').classList.add('active');
    document.getElementById('username').value = '';
    document.getElementById('pin').value = '';
    document.getElementById('loginError').textContent = '';
});

// ===== PAUSE HANDLERS =====
document.getElementById('pauseBtn').addEventListener('click', function() {
    pauseGame();
});

document.getElementById('resumeBtn').addEventListener('click', function() {
    resumeGame();
});

document.getElementById('saveQuitBtn').addEventListener('click', function() {
    saveProgress();
    gameState.gameActive = false;
    gameState.paused = false;
    document.getElementById('pauseMenu').classList.remove('active');
    document.getElementById('gameScreen').classList.remove('active');
    showHomepage();
});

function pauseGame() {
    if (!gameState.gameActive) return;
    gameState.paused = true;
    document.getElementById('pauseMenu').classList.add('active');
}

function resumeGame() {
    gameState.paused = false;
    document.getElementById('pauseMenu').classList.remove('active');
}


// Play Again Button
document.getElementById('playAgain').addEventListener('click', function() {
    gameState.currentLevel = 1;
    gameState.puzzlePieces = 0;
    document.getElementById('finalPuzzle').classList.remove('active');
    document.getElementById('homepage').classList.add('active');
});


// Keyboard Controls
document.addEventListener('keydown', (e) => {
    // Don't intercept keys if user is typing in an input field
    const isInputField = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable;
    if (isInputField) {
        return;
    }

    // Escape key to pause/resume
    if (e.key === 'Escape') {
        e.preventDefault();
        if (gameState.gameActive) {
            if (gameState.paused) {
                resumeGame();
            } else {
                pauseGame();
            }
        }
        return;
    }

    // Don't process game controls if paused
    if (gameState.paused) return;

    if (keys.hasOwnProperty(e.key)) {
        e.preventDefault();
        keys[e.key] = true;
    }

    // Jump with up arrow - only trigger once per press
    if (e.key === 'ArrowUp' && gameState.gameActive && !e.repeat && gameState.currentLevel !== 1) {
        // More lenient jump check: allow jump if onGround or if velocity is very low (recently landed)
        if ((player.onGround || Math.abs(player.velocityY) < 1) && !player.isJumping) {
            // Regular jump from ground
            player.isJumping = true;
            player.onGround = false;
            player.velocityY = -player.jumpPower;

            // Running jump: Add horizontal momentum if moving left or right
            if (keys.ArrowLeft) {
                player.velocityX = -player.speed * 2.5; // Boost left
            } else if (keys.ArrowRight) {
                player.velocityX = player.speed * 2.5; // Boost right
            }
        } else if (player.wallSliding) {
            // Wall jump - kick off the wall
            const wallDirection = player.touchingWallSide;

            player.velocityY = -player.jumpPower; // Jump up
            player.wallSliding = false;
            player.isJumping = true;

            if (wallDirection === 'left') {
                // Touching left wall, push right
                player.velocityX = player.speed * 4;
            } else if (wallDirection === 'right') {
                // Touching right wall, push left
                player.velocityX = -player.speed * 4;
            }
        }
    }
});

document.addEventListener('keyup', (e) => {
    // Don't intercept keys if user is typing in an input field
    const isInputField = e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable;
    if (isInputField) {
        return;
    }

    if (keys.hasOwnProperty(e.key)) {
        keys[e.key] = false;
    }
});

// Track if game loop is already running
let gameLoopRunning = false;

// Start Game
function startGame() {
    gameState.gameActive = true;
    gameState.paused = false;
    // Don't reset level and pieces here - let the caller set them
    loadLevel(gameState.currentLevel);
    gameState.transitioning = false;

    // Only start game loop if not already running
    if (!gameLoopRunning) {
        gameLoopRunning = true;
        gameLoop();
    }
}

// Maze Generation (Recursive Backtracking)
function generateMaze(level) {
    // Level 1 - Follow the path in the background image (no maze walls)
    if (level === 1) {
        cols = 1;
        rows = 1;
        cellSize = Math.min(canvas.width, canvas.height);

        // Initialize empty grid - no walls, just open space
        maze = [];
        maze[0] = [];
        maze[0][0] = {
            x: 0,
            y: 0,
            walls: { top: false, right: false, bottom: false, left: false },
            visited: true
        };

        return;
    }

    // Level 9 - Special maze with rooms and corridors
    if (level === 9) {
        generateRoomsMaze();
        return;
    }

    // Level 16 - Hand-crafted symmetrical maze
    if (level === 16) {
        generateSymmetricalMaze();
        return;
    }

    // Difficulty tiers: Easy (2-10), Medium (11-35), Hard (36-50)
    if (level <= 10) {
        // Easy levels: 70-80px cells
        const easyCellSize = 80 - ((level - 2) * 1.25); // Gradually decrease from 80 to 70
        cellSize = Math.max(70, easyCellSize);
    } else if (level <= 35) {
        // Medium levels: 60-70px cells
        const mediumProgress = (level - 11) / 24; // 0 to 1 over levels 11-35
        cellSize = 70 - (mediumProgress * 10); // Decrease from 70 to 60
    } else {
        // Hard levels: 50-60px cells
        const hardProgress = (level - 36) / 14; // 0 to 1 over levels 36-50
        cellSize = 60 - (hardProgress * 10); // Decrease from 60 to 50
    }

    // Calculate grid dimensions to fill canvas
    cols = Math.floor(canvas.width / cellSize);
    rows = Math.floor(canvas.height / cellSize);

    // Recalculate exact cell size to fill canvas completely
    cellSize = Math.min(canvas.width / cols, canvas.height / rows);

    // Initialize grid
    maze = [];
    for (let y = 0; y < rows; y++) {
        maze[y] = [];
        for (let x = 0; x < cols; x++) {
            maze[y][x] = {
                x: x,
                y: y,
                walls: { top: true, right: true, bottom: true, left: true },
                visited: false
            };
        }
    }

    // Recursive backtracking algorithm
    const stack = [];
    let current = maze[0][0];
    current.visited = true;

    while (true) {
        const neighbors = getUnvisitedNeighbors(current);

        if (neighbors.length > 0) {
            const next = neighbors[Math.floor(Math.random() * neighbors.length)];
            stack.push(current);
            removeWalls(current, next);
            next.visited = true;
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
        } else {
            break;
        }
    }

    // Add some random openings for higher levels
    // Levels 10 and 15 get extra openings to prevent getting stuck
    const openings = (level === 10 || level === 15) ? 6 : Math.floor(level / 5);
    for (let i = 0; i < openings; i++) {
        const x = Math.floor(Math.random() * cols);
        const y = Math.floor(Math.random() * rows);
        const walls = ['top', 'right', 'bottom', 'left'];
        const wall = walls[Math.floor(Math.random() * walls.length)];
        maze[y][x].walls[wall] = false;
    }
}

function getUnvisitedNeighbors(cell) {
    const neighbors = [];
    const { x, y } = cell;

    if (y > 0 && !maze[y - 1][x].visited) neighbors.push(maze[y - 1][x]);
    if (x < cols - 1 && !maze[y][x + 1].visited) neighbors.push(maze[y][x + 1]);
    if (y < rows - 1 && !maze[y + 1][x].visited) neighbors.push(maze[y + 1][x]);
    if (x > 0 && !maze[y][x - 1].visited) neighbors.push(maze[y][x - 1]);

    return neighbors;
}

function removeWalls(current, next) {
    const dx = current.x - next.x;
    const dy = current.y - next.y;

    if (dx === 1) {
        current.walls.left = false;
        next.walls.right = false;
    } else if (dx === -1) {
        current.walls.right = false;
        next.walls.left = false;
    }

    if (dy === 1) {
        current.walls.top = false;
        next.walls.bottom = false;
    } else if (dy === -1) {
        current.walls.bottom = false;
        next.walls.top = false;
    }
}

// Store rooms for level 9 puzzle placement
let level9Rooms = [];

// Generate Rooms and Corridors Maze (for Level 9)
function generateRoomsMaze() {
    cellSize = 75;
    cols = Math.floor(canvas.width / cellSize);
    rows = Math.floor(canvas.height / cellSize);
    cellSize = Math.min(canvas.width / cols, canvas.height / rows);

    // Initialize grid with all walls
    maze = [];
    for (let y = 0; y < rows; y++) {
        maze[y] = [];
        for (let x = 0; x < cols; x++) {
            maze[y][x] = {
                x: x,
                y: y,
                walls: { top: true, right: true, bottom: true, left: true },
                visited: true,
                isRoom: false
            };
        }
    }

    // Create rooms (open 2x2 or 3x2 areas)
    const rooms = [];
    const numRooms = 4;

    for (let i = 0; i < numRooms; i++) {
        let roomWidth = 2 + Math.floor(Math.random() * 2); // 2 or 3
        let roomHeight = 2 + Math.floor(Math.random() * 2); // 2 or 3
        let roomX = Math.floor(Math.random() * (cols - roomWidth - 1)) + 1;
        let roomY = Math.floor(Math.random() * (rows - roomHeight - 1)) + 1;

        // Clear walls inside the room
        for (let ry = roomY; ry < roomY + roomHeight && ry < rows; ry++) {
            for (let rx = roomX; rx < roomX + roomWidth && rx < cols; rx++) {
                maze[ry][rx].isRoom = true;

                // Remove internal walls
                if (rx > roomX) maze[ry][rx].walls.left = false;
                if (rx < roomX + roomWidth - 1) maze[ry][rx].walls.right = false;
                if (ry > roomY) maze[ry][rx].walls.top = false;
                if (ry < roomY + roomHeight - 1) maze[ry][rx].walls.bottom = false;
            }
        }

        rooms.push({ x: roomX, y: roomY, width: roomWidth, height: roomHeight });
    }

    // Create corridors connecting rooms using simple pathfinding
    for (let i = 0; i < rooms.length - 1; i++) {
        const room1 = rooms[i];
        const room2 = rooms[i + 1];

        // Start from center of room1
        let cx = Math.floor(room1.x + room1.width / 2);
        let cy = Math.floor(room1.y + room1.height / 2);

        // Target center of room2
        const tx = Math.floor(room2.x + room2.width / 2);
        const ty = Math.floor(room2.y + room2.height / 2);

        // Create horizontal corridor first
        while (cx !== tx) {
            const nextX = cx + (tx > cx ? 1 : -1);
            if (nextX >= 0 && nextX < cols) {
                if (tx > cx) {
                    maze[cy][cx].walls.right = false;
                    maze[cy][nextX].walls.left = false;
                } else {
                    maze[cy][cx].walls.left = false;
                    maze[cy][nextX].walls.right = false;
                }
                cx = nextX;
            } else break;
        }

        // Then create vertical corridor
        while (cy !== ty) {
            const nextY = cy + (ty > cy ? 1 : -1);
            if (nextY >= 0 && nextY < rows) {
                if (ty > cy) {
                    maze[cy][cx].walls.bottom = false;
                    maze[nextY][cx].walls.top = false;
                } else {
                    maze[cy][cx].walls.top = false;
                    maze[nextY][cx].walls.bottom = false;
                }
                cy = nextY;
            } else break;
        }
    }

    // Ensure start (0,0) is accessible
    maze[0][0].walls.left = false;
    maze[0][0].walls.top = false;

    // Connect start to first room if needed
    const firstRoom = rooms[0];
    let sx = 0, sy = 0;
    const frx = Math.floor(firstRoom.x + firstRoom.width / 2);
    const fry = Math.floor(firstRoom.y + firstRoom.height / 2);

    // Path from start to first room
    while (sx !== frx) {
        const nextX = sx + (frx > sx ? 1 : -1);
        if (nextX >= 0 && nextX < cols) {
            if (frx > sx) {
                maze[sy][sx].walls.right = false;
                if (nextX < cols) maze[sy][nextX].walls.left = false;
            }
            sx = nextX;
        } else break;
    }

    while (sy !== fry) {
        const nextY = sy + (fry > sy ? 1 : -1);
        if (nextY >= 0 && nextY < rows) {
            if (fry > sy) {
                maze[sy][sx].walls.bottom = false;
                if (nextY < rows) maze[nextY][sx].walls.top = false;
            }
            sy = nextY;
        } else break;
    }

    // Store rooms for puzzle placement
    level9Rooms = rooms;
}

// Generate Open Maze with Islands (for Level 16)
function generateSymmetricalMaze() {
    cols = 13;
    rows = 10;
    cellSize = Math.min(canvas.width / cols, canvas.height / rows);

    // Initialize grid with NO walls (open space)
    maze = [];
    for (let y = 0; y < rows; y++) {
        maze[y] = [];
        for (let x = 0; x < cols; x++) {
            maze[y][x] = {
                x: x,
                y: y,
                walls: { top: false, right: false, bottom: false, left: false },
                visited: true
            };
        }
    }

    // Create "islands" (solid wall blocks that act as obstacles)
    // Island 1: Top-left area (2x2)
    const island1 = [
        {x: 2, y: 1}, {x: 3, y: 1},
        {x: 2, y: 2}, {x: 3, y: 2}
    ];

    // Island 2: Top-right area (2x3)
    const island2 = [
        {x: 9, y: 1}, {x: 10, y: 1},
        {x: 9, y: 2}, {x: 10, y: 2},
        {x: 9, y: 3}, {x: 10, y: 3}
    ];

    // Island 3: Middle-left (3x2)
    const island3 = [
        {x: 1, y: 5}, {x: 2, y: 5}, {x: 3, y: 5},
        {x: 1, y: 6}, {x: 2, y: 6}, {x: 3, y: 6}
    ];

    // Island 4: Middle-right (2x2)
    const island4 = [
        {x: 7, y: 4}, {x: 8, y: 4},
        {x: 7, y: 5}, {x: 8, y: 5}
    ];

    // Island 5: Bottom-center (3x2)
    const island5 = [
        {x: 5, y: 7}, {x: 6, y: 7}, {x: 7, y: 7},
        {x: 5, y: 8}, {x: 6, y: 8}, {x: 7, y: 8}
    ];

    const allIslands = [...island1, ...island2, ...island3, ...island4, ...island5];

    // Build walls around each island cell
    allIslands.forEach(cell => {
        const {x, y} = cell;
        if (y >= 0 && y < rows && x >= 0 && x < cols) {
            // Add all walls to this island cell
            maze[y][x].walls = { top: true, right: true, bottom: true, left: true };
        }
    });

    // Remove internal walls within islands to make them solid blocks
    allIslands.forEach(cell => {
        const {x, y} = cell;
        // Check if neighbors are also island cells
        // If right neighbor is island, remove right/left walls between them
        if (allIslands.find(c => c.x === x + 1 && c.y === y)) {
            maze[y][x].walls.right = false;
            if (x + 1 < cols) maze[y][x + 1].walls.left = false;
        }
        // If bottom neighbor is island, remove bottom/top walls between them
        if (allIslands.find(c => c.x === x && c.y === y + 1)) {
            maze[y][x].walls.bottom = false;
            if (y + 1 < rows) maze[y + 1][x].walls.top = false;
        }
    });

    console.log('Level 16: Open maze with islands created - navigate around the obstacles!');
}

// Load Level
function loadLevel(level) {
    console.log(`Loading level ${level}`);
    generateMaze(level);

    // Scale player size based on cell size (smaller cells = smaller Sawyer)
    if (level === 1) {
        // Level 1: Keep original size
        player.width = 44;
        player.height = 44;
    } else if (level === 2) {
        // Level 2: Keep original size
        player.width = 44;
        player.height = 44;
    } else {
        // Levels 3+: Scale based on cell size to fit better in maze corridors
        // Make Sawyer about 50% of the cell size for very comfortable navigation
        // But keep minimum size of 25 and maximum of 44
        const targetSize = Math.floor(cellSize * 0.5);
        player.width = Math.max(25, Math.min(44, targetSize));
        player.height = Math.max(25, Math.min(44, targetSize));
    }

    // Reset player position
    if (level === 1) {
        // Level 1: Position at bottom center of the path
        player.x = canvas.width / 2 - player.width / 2;
        player.y = canvas.height - 100; // Near bottom
    } else {
        // All other levels: Start at top-left cell, centered within it
        // This prevents getting stuck between maze walls and floor
        player.x = cellSize / 2 - player.width / 2;
        player.y = cellSize / 2 - player.height / 2;
    }

    player.velocityY = 0;
    player.velocityX = 0;
    player.isJumping = false;
    player.onGround = false;
    player.wallSliding = false;
    player.touchingWallSide = null;

    // Place puzzle piece
    if (level === 1) {
        // Level 1: Place in middle of the pathway
        puzzlePiece = {
            x: canvas.width / 2 - 15,
            y: canvas.height / 2 - 15,
            width: 30,
            height: 30,
            collected: false
        };
    } else if (level === 9 && level9Rooms.length > 0) {
        // Level 9: Place in the center of the last room
        const lastRoom = level9Rooms[level9Rooms.length - 1];
        const roomCenterX = lastRoom.x + Math.floor(lastRoom.width / 2);
        const roomCenterY = lastRoom.y + Math.floor(lastRoom.height / 2);
        puzzlePiece = {
            x: roomCenterX * cellSize + cellSize / 2 - 15,
            y: roomCenterY * cellSize + cellSize / 2 - 15,
            width: 30,
            height: 30,
            collected: false
        };
    } else {
        // Other levels: Place at the end of the maze
        puzzlePiece = {
            x: (cols - 1) * cellSize + cellSize / 2 - 15,
            y: (rows - 1) * cellSize + cellSize / 2 - 15,
            width: 30,
            height: 30,
            collected: false
        };
    }

    // Update UI
    document.getElementById('currentLevel').textContent = level;
    document.getElementById('puzzlePieces').textContent = gameState.puzzlePieces;
}

// Game Loop
function gameLoop() {
    if (!gameState.gameActive) {
        console.log('Game loop stopped - gameActive is false');
        return;
    }

    // Don't update game logic if paused, but still draw
    if (!gameState.paused) {
        // Handle level transition countdown
        if (gameState.transitioning) {
            gameState.transitionFrames++;
            if (gameState.transitionFrames >= gameState.transitionDelay) {
                loadLevel(gameState.currentLevel);
                gameState.transitioning = false;
                gameState.transitionFrames = 0;
            }
            // Safety check: if stuck in transition for too long, force it to end
            if (gameState.transitionFrames > 120) { // 2 seconds at 60fps
                console.log('Forcing transition to end');
                gameState.transitioning = false;
                gameState.transitionFrames = 0;
                loadLevel(gameState.currentLevel);
            }
        } else {
            // Only update physics if not transitioning between levels
            update();
        }
    }

    draw();
    requestAnimationFrame(gameLoop);
}

// Update Game State
function update() {
    // Store old position
    const oldX = player.x;
    const oldY = player.y;

    // Horizontal movement with arrow keys
    let moveX = 0;
    if (keys.ArrowLeft) {
        moveX -= player.speed;
        player.direction = 'left';
    }
    if (keys.ArrowRight) {
        moveX += player.speed;
        player.direction = 'right';
    }

    // Apply horizontal velocity (for wall kicks)
    moveX += player.velocityX;

    // Try to move horizontally
    player.x += moveX;

    // Friction
    player.velocityX *= 0.88;
    if (Math.abs(player.velocityX) < 0.1) {
        player.velocityX = 0;
    }

    // Level 1: No maze collision, just keep on path
    if (gameState.currentLevel === 1) {
        // Keep player in bounds
        player.x = Math.max(50, Math.min(canvas.width - player.width - 50, player.x));
        player.y = Math.max(50, Math.min(canvas.height - player.height - 50, player.y));

        // Allow up/down movement for level 1
        if (keys.ArrowUp) {
            player.y -= player.speed;
        }
        if (keys.ArrowDown) {
            player.y += player.speed;
        }
    } else {
        // Other levels: Check horizontal collision
        const horizontalCollision = handleMazeCollision();
        if (horizontalCollision.hasCollision) {
            player.x = oldX; // Revert X if collision
            player.velocityX = 0; // Stop horizontal velocity

            // Enable wall sliding if in air and touching a side wall
            if (horizontalCollision.touchingWall && !player.onGround) {
                player.wallSliding = true;
                player.touchingWallSide = horizontalCollision.wallSide;
            }
        } else {
            player.wallSliding = false;
            player.touchingWallSide = null;
        }

        // Apply gravity (slower when wall sliding)
        if (player.wallSliding) {
            player.velocityY += player.gravity * 0.3; // Slower fall on wall
            if (player.velocityY > player.wallSlideSpeed) {
                player.velocityY = player.wallSlideSpeed; // Cap sliding speed
            }
        } else {
            player.velocityY += player.gravity;
        }

        // Store Y before vertical movement
        const preVerticalY = player.y;

        // Try to move vertically
        player.y += player.velocityY;

        // Check if hit the canvas floor first (safety net)
        const canvasFloor = canvas.height - 5;
        if (player.y + player.height >= canvasFloor) {
            player.y = canvasFloor - player.height;
            player.onGround = true;
            player.isJumping = false;
            player.velocityY = 0;
            player.wallSliding = false;
        } else {
            // Check vertical collision with maze walls
            const verticalCollision = handleMazeCollision();
            if (verticalCollision.hasCollision) {
                // If we were falling, we hit the ground
                if (player.velocityY > 0) {
                    player.y = preVerticalY; // Revert Y to position before this vertical move
                    player.onGround = true;
                    player.isJumping = false;
                    player.velocityY = 0;
                    player.wallSliding = false;
                } else {
                    // Hit ceiling
                    player.y = preVerticalY;
                    player.velocityY = 0;
                }
            } else {
                // In air, not touching ground
                if (player.velocityY > 0.5) {
                    player.onGround = false;
                }
            }
        }
    }

    // Keep player in bounds
    if (gameState.currentLevel !== 1) {
        player.x = Math.max(0, Math.min(canvas.width - player.width, player.x));
        player.y = Math.max(0, Math.min(canvas.height - player.height, player.y));

        // Anti-stuck mechanism: only trigger when truly stuck (not on ground and not moving)
        if (!player.lastPosition) {
            player.lastPosition = { x: player.x, y: player.y, stuckFrames: 0 };
        }

        const distanceMoved = Math.abs(player.x - player.lastPosition.x) + Math.abs(player.y - player.lastPosition.y);

        // Only consider stuck if:
        // 1. Not moving much (< 0.5 pixels)
        // 2. Player is in the air (not grounded)
        // 3. Velocity is very low (stuck in collision, not freely falling)
        // 4. Movement keys are pressed
        const isStuck = distanceMoved < 0.5 &&
                       !player.grounded &&
                       Math.abs(player.velocityY) < 2 &&
                       Math.abs(player.velocityX) < 2 &&
                       (keys.ArrowLeft || keys.ArrowRight || keys.ArrowUp);

        if (isStuck) {
            player.lastPosition.stuckFrames++;

            // If stuck for more than 15 frames, give a push (increased threshold)
            if (player.lastPosition.stuckFrames > 15) {
                // Try pushing up
                player.y -= 3;
                const testCollision = handleMazeCollision();
                if (testCollision.hasCollision) {
                    player.y += 3; // Revert if that causes collision
                    // Try horizontal nudge
                    if (keys.ArrowLeft) player.x += 2;
                    if (keys.ArrowRight) player.x -= 2;
                }

                // If still stuck after 30 frames, do a bigger jump
                if (player.lastPosition.stuckFrames > 30) {
                    player.y -= 10;
                    player.velocityY = -5;
                    player.lastPosition.stuckFrames = 0;
                }
            }
        } else {
            player.lastPosition.stuckFrames = 0;
        }

        player.lastPosition.x = player.x;
        player.lastPosition.y = player.y;
    }

    // Check puzzle piece collection
    if (!puzzlePiece.collected && checkCollision(player, puzzlePiece)) {
        puzzlePiece.collected = true;
        gameState.puzzlePieces++;

        // Auto-save progress after collecting piece
        saveProgress();

        if (gameState.currentLevel < gameState.maxLevel) {
            gameState.currentLevel++;
            // Pause physics briefly during level transition using frame counter
            gameState.transitioning = true;
            gameState.transitionFrames = 0;
        } else {
            // Game completed!
            gameState.gameActive = false;
            showFinalPuzzle();
        }
    }
}

// Check for ground below player
function checkGroundBelow() {
    const feetY = player.y + player.height;
    const centerX = player.x + player.width / 2;
    const cellCol = Math.floor(centerX / cellSize);

    // Check a few pixels below
    for (let checkDist = 0; checkDist <= 5; checkDist++) {
        const checkY = feetY + checkDist;
        const cellRow = Math.floor(checkY / cellSize);

        if (cellRow >= 0 && cellRow < rows && cellCol >= 0 && cellCol < cols) {
            const cell = maze[cellRow][cellCol];
            const cellTop = cellRow * cellSize;

            // Check if there's a wall at the top of this cell
            if (cell.walls.top && checkY >= cellTop - 2 && checkY <= cellTop + 2) {
                return { onGround: true, groundY: cellTop - player.height };
            }
        }
    }

    return { onGround: false, groundY: player.y };
}

// Maze Collision Detection
function handleMazeCollision() {
    const wallThickness = 3;
    const cornerMargin = 5; // Larger margin for corners to prevent getting stuck
    let collisionDetected = false;
    let touchingWall = false;
    let wallSide = null;

    // Get all cells the player overlaps with (with small buffer)
    const playerLeft = player.x + 1;
    const playerRight = player.x + player.width - 1;
    const playerTop = player.y + 1;
    const playerBottom = player.y + player.height - 1;

    const minCol = Math.max(0, Math.floor(playerLeft / cellSize));
    const maxCol = Math.min(cols - 1, Math.floor(playerRight / cellSize));
    const minRow = Math.max(0, Math.floor(playerTop / cellSize));
    const maxRow = Math.min(rows - 1, Math.floor(playerBottom / cellSize));

    // Check all cells the player overlaps with
    for (let checkRow = minRow; checkRow <= maxRow; checkRow++) {
        for (let checkCol = minCol; checkCol <= maxCol; checkCol++) {
            const cell = maze[checkRow][checkCol];
            const cellLeft = checkCol * cellSize;
            const cellRight = (checkCol + 1) * cellSize;
            const cellTop = checkRow * cellSize;
            const cellBottom = (checkRow + 1) * cellSize;

            // Check left wall (vertical)
            if (cell.walls.left) {
                if (playerRight > cellLeft &&
                    playerLeft < cellLeft + wallThickness &&
                    playerBottom > cellTop + cornerMargin &&
                    playerTop < cellBottom - cornerMargin) {
                    collisionDetected = true;
                    touchingWall = true;
                    wallSide = 'left';
                }
            }

            // Check right wall (vertical)
            if (cell.walls.right) {
                if (playerLeft < cellRight &&
                    playerRight > cellRight - wallThickness &&
                    playerBottom > cellTop + cornerMargin &&
                    playerTop < cellBottom - cornerMargin) {
                    collisionDetected = true;
                    touchingWall = true;
                    wallSide = 'right';
                }
            }

            // Check top wall (horizontal)
            if (cell.walls.top) {
                if (playerBottom > cellTop &&
                    playerTop < cellTop + wallThickness &&
                    playerRight > cellLeft + cornerMargin &&
                    playerLeft < cellRight - cornerMargin) {
                    collisionDetected = true;
                }
            }

            // Check bottom wall (horizontal)
            if (cell.walls.bottom) {
                if (playerTop < cellBottom &&
                    playerBottom > cellBottom - wallThickness &&
                    playerRight > cellLeft + cornerMargin &&
                    playerLeft < cellRight - cornerMargin) {
                    collisionDetected = true;
                }
            }
        }
    }

    return { hasCollision: collisionDetected, touchingWall: touchingWall, wallSide: wallSide };
}

// Collision Detection
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Draw Everything
function draw() {
    // Clear canvas first
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background based on level
    if (gameState.currentLevel === 1) {
        // Level 1: Draw SVG background
        ctx.drawImage(level1Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 2) {
        // Level 2: Draw SVG background
        ctx.drawImage(level2Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 3) {
        // Level 3: Draw SVG background
        ctx.drawImage(level3Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 4) {
        // Level 4: Draw SVG background
        ctx.drawImage(level4Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 5) {
        // Level 5: Draw SVG background
        ctx.drawImage(level5Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 6) {
        // Level 6: Draw SVG background
        ctx.drawImage(level6Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 7) {
        // Level 7: Draw SVG background
        ctx.drawImage(level7Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 8) {
        // Level 8: Draw SVG background
        ctx.drawImage(level8Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 9) {
        // Level 9: Draw SVG background
        ctx.drawImage(level9Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 10) {
        // Level 10: Draw SVG background
        ctx.drawImage(level10Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 11) {
        // Level 11: Draw SVG background
        ctx.drawImage(level11Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 12) {
        // Level 12: Draw SVG background
        ctx.drawImage(level12Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 13) {
        // Level 13: Draw SVG background
        ctx.drawImage(level13Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 14) {
        // Level 14: Draw SVG background
        ctx.drawImage(level14Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 15) {
        // Level 15: Draw SVG background
        ctx.drawImage(level15Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 16) {
        // Level 16: Draw SVG background
        ctx.drawImage(level16Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 17) {
        // Level 17: Draw SVG background
        ctx.drawImage(level17Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 18) {
        // Level 18: Draw SVG background
        ctx.drawImage(level18Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 19) {
        // Level 19: Draw SVG background
        ctx.drawImage(level19Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 20) {
        // Level 20: Draw SVG background
        ctx.drawImage(level20Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 21) {
        // Level 21: Draw SVG background
        ctx.drawImage(level21Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 22) {
        // Level 22: Draw SVG background
        ctx.drawImage(level22Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 23) {
        // Level 23: Draw SVG background
        ctx.drawImage(level23Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 24) {
        // Level 24: Draw SVG background
        ctx.drawImage(level24Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 25) {
        // Level 25: Draw SVG background
        ctx.drawImage(level25Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 26) {
        // Level 26: Draw SVG background
        ctx.drawImage(level26Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 27) {
        // Level 27: Draw SVG background
        ctx.drawImage(level27Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 28) {
        // Level 28: Draw SVG background
        ctx.drawImage(level28Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 29) {
        // Level 29: Draw SVG background
        ctx.drawImage(level29Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 30) {
        // Level 30: Draw SVG background
        ctx.drawImage(level30Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 31) {
        // Level 31: Draw SVG background
        ctx.drawImage(level31Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 32) {
        // Level 32: Draw SVG background
        ctx.drawImage(level32Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 33) {
        // Level 33: Draw SVG background
        ctx.drawImage(level33Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 34) {
        // Level 34: Draw SVG background
        ctx.drawImage(level34Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 35) {
        // Level 35: Draw SVG background
        ctx.drawImage(level35Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 36) {
        // Level 36: Draw SVG background
        ctx.drawImage(level36Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 37) {
        // Level 37: Draw SVG background
        ctx.drawImage(level37Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 38) {
        // Level 38: Draw SVG background
        ctx.drawImage(level38Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 39) {
        // Level 39: Draw SVG background
        ctx.drawImage(level39Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 40) {
        // Level 40: Draw SVG background
        ctx.drawImage(level40Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 41) {
        // Level 41: Draw SVG background
        ctx.drawImage(level41Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 42) {
        // Level 42: Draw SVG background
        ctx.drawImage(level42Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 43) {
        // Level 43: Draw SVG background
        ctx.drawImage(level43Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 44) {
        // Level 44: Draw SVG background
        ctx.drawImage(level44Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 45) {
        // Level 45: Draw SVG background
        ctx.drawImage(level45Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 46) {
        // Level 46: Draw SVG background
        ctx.drawImage(level46Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 47) {
        // Level 47: Draw SVG background
        ctx.drawImage(level47Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 48) {
        // Level 48: Draw SVG background
        ctx.drawImage(level48Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 49) {
        // Level 49: Draw SVG background
        ctx.drawImage(level49Background, 0, 0, canvas.width, canvas.height);
    } else if (gameState.currentLevel === 50) {
        // Level 50: Draw SVG background
        ctx.drawImage(level50Background, 0, 0, canvas.width, canvas.height);
    } else {
        // Other levels: Draw light sage green background
        ctx.fillStyle = '#b8d4ad';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Draw maze
    drawMaze();

    // Draw puzzle piece
    if (!puzzlePiece.collected) {
        drawPuzzlePiece();
    }

    // Draw player (chocolate dog)
    drawDog();

    // Draw tutorial Sawyer with speech bubble on level 1
    if (gameState.currentLevel === 1) {
        drawTutorialSawyer();
    }
}

// Draw Tutorial Sawyer with Speech Bubble (Level 1 only)
function drawTutorialSawyer() {
    ctx.save();

    // Position Sawyer in the upper left corner
    const sawyer_x = 30;
    const sawyer_y = 20;
    const sawyer_width = 120;
    const sawyer_height = 120;

    // Draw Sawyer SVG
    ctx.drawImage(tutorialSawyer, sawyer_x, sawyer_y, sawyer_width, sawyer_height);

    // Draw speech bubble
    const bubbleX = sawyer_x + sawyer_width + 20;
    const bubbleY = sawyer_y + 20;
    const bubbleWidth = 320;
    const bubbleHeight = 120;
    const borderRadius = 15;

    // Speech bubble background
    ctx.fillStyle = 'white';
    ctx.strokeStyle = '#2a1810';
    ctx.lineWidth = 4;

    // Draw rounded rectangle for speech bubble
    ctx.beginPath();
    ctx.moveTo(bubbleX + borderRadius, bubbleY);
    ctx.lineTo(bubbleX + bubbleWidth - borderRadius, bubbleY);
    ctx.quadraticCurveTo(bubbleX + bubbleWidth, bubbleY, bubbleX + bubbleWidth, bubbleY + borderRadius);
    ctx.lineTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight - borderRadius);
    ctx.quadraticCurveTo(bubbleX + bubbleWidth, bubbleY + bubbleHeight, bubbleX + bubbleWidth - borderRadius, bubbleY + bubbleHeight);
    ctx.lineTo(bubbleX + borderRadius, bubbleY + bubbleHeight);
    ctx.quadraticCurveTo(bubbleX, bubbleY + bubbleHeight, bubbleX, bubbleY + bubbleHeight - borderRadius);
    ctx.lineTo(bubbleX, bubbleY + borderRadius);
    ctx.quadraticCurveTo(bubbleX, bubbleY, bubbleX + borderRadius, bubbleY);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Draw speech bubble pointer (triangle pointing to Sawyer)
    ctx.beginPath();
    ctx.moveTo(bubbleX, bubbleY + 50);
    ctx.lineTo(bubbleX - 15, bubbleY + 45);
    ctx.lineTo(bubbleX - 15, bubbleY + 55);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#2a1810';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Draw text inside speech bubble
    ctx.fillStyle = '#5d4429';
    ctx.font = 'bold 18px Fredoka, "Comic Sans MS", cursive, sans-serif';
    ctx.textAlign = 'left';

    const textX = bubbleX + 20;
    const textY = bubbleY + 35;
    const lineHeight = 28;

    ctx.fillText('Use Arrow Keys to move!', textX, textY);
    ctx.fillText('← Left  → Right', textX, textY + lineHeight);
    ctx.fillText('↑ Jump', textX, textY + lineHeight * 2);

    ctx.restore();
}


// Draw Maze
function drawMaze() {
    // Skip drawing maze walls for level 1 (uses background path)
    if (gameState.currentLevel === 1) {
        return;
    }

    // Draw Studio Ghibli-style bush walls
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const cell = maze[y][x];
            const cellX = x * cellSize;
            const cellY = y * cellSize;

            if (cell.walls.top) {
                drawBushWall(cellX, cellY, cellX + cellSize, cellY, 'horizontal');
            }
            if (cell.walls.right) {
                drawBushWall(cellX + cellSize, cellY, cellX + cellSize, cellY + cellSize, 'vertical');
            }
            if (cell.walls.bottom) {
                drawBushWall(cellX, cellY + cellSize, cellX + cellSize, cellY + cellSize, 'horizontal');
            }
            if (cell.walls.left) {
                drawBushWall(cellX, cellY, cellX, cellY + cellSize, 'vertical');
            }
        }
    }
}

// Draw Studio Ghibli-style Bush Wall
function drawBushWall(x1, y1, x2, y2, orientation) {
    const length = orientation === 'horizontal' ? x2 - x1 : y2 - y1;
    const bumpSize = 6; // Size of individual leaf bumps (reduced from 8)
    const numBumps = Math.ceil(length / (bumpSize * 1.5));

    // Three color palette: dark orange (shadows), regular orange (base), light orange (highlights)
    // Levels 3, 12, 23, 41, and 44 use darker orange colors
    // Levels 17, 32, 37, 39, 43, and 48 use very light bright orange colors
    // Levels 13 and 40 use white colors
    // Level 19 uses ombre from light orange at top to orange at bottom
    // Level 22 uses ombre from regular orange at top to dark orange at bottom
    // Level 35 uses ombre from light orange at top to orange at bottom
    // Levels 45 and 47 use ombre from light orange at top to orange at bottom
    // Level 46 uses ombre from white at top to orange at bottom
    let darkOrange, regularOrange, lightOrange;
    if (gameState.currentLevel === 3 || gameState.currentLevel === 12 || gameState.currentLevel === 23 || gameState.currentLevel === 41 || gameState.currentLevel === 44) {
        darkOrange = '#8B3A0A';      // Much darker orange for shadows
        regularOrange = '#B8540C';   // Darker orange for base
        lightOrange = '#E87A2F';     // Medium orange for highlights
    } else if (gameState.currentLevel === 13 || gameState.currentLevel === 40) {
        darkOrange = '#E8E8E8';      // Light gray for shadows
        regularOrange = '#F5F5F5';   // Off-white for base
        lightOrange = '#FFFFFF';     // Pure white for highlights
    } else if (gameState.currentLevel === 19) {
        // Ombre effect: calculate based on Y position (0 at top, canvas.height at bottom)
        const midY = (y1 + y2) / 2; // Get middle Y position of wall
        const progress = Math.min(1, Math.max(0, midY / canvas.height)); // 0 at top, 1 at bottom

        // Interpolate from light orange at top to regular orange at bottom
        const lightTop = { r: 0xFF, g: 0xD9, b: 0xB3 }; // #FFD9B3 - Very light at top
        const darkBottom = { r: 0xE8, g: 0x7A, b: 0x2F }; // #E87A2F - Regular orange at bottom

        const r = Math.round(lightTop.r + (darkBottom.r - lightTop.r) * progress);
        const g = Math.round(lightTop.g + (darkBottom.g - lightTop.g) * progress);
        const b = Math.round(lightTop.b + (darkBottom.b - lightTop.b) * progress);

        const baseColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

        // Create darker and lighter versions for shadows and highlights
        darkOrange = `#${Math.max(0, r-40).toString(16).padStart(2, '0')}${Math.max(0, g-40).toString(16).padStart(2, '0')}${Math.max(0, b-40).toString(16).padStart(2, '0')}`;
        regularOrange = baseColor;
        lightOrange = `#${Math.min(255, r+20).toString(16).padStart(2, '0')}${Math.min(255, g+20).toString(16).padStart(2, '0')}${Math.min(255, b+20).toString(16).padStart(2, '0')}`;
    } else if (gameState.currentLevel === 22) {
        // Ombre effect: calculate based on Y position (0 at top, canvas.height at bottom)
        const midY = (y1 + y2) / 2; // Get middle Y position of wall
        const progress = Math.min(1, Math.max(0, midY / canvas.height)); // 0 at top, 1 at bottom

        // Interpolate from regular orange at top to dark orange at bottom
        const regularTop = { r: 0xE8, g: 0x7A, b: 0x2F }; // #E87A2F - Regular orange at top
        const darkBottom = { r: 0x8B, g: 0x3A, b: 0x0A }; // #8B3A0A - Much darker orange at bottom

        const r = Math.round(regularTop.r + (darkBottom.r - regularTop.r) * progress);
        const g = Math.round(regularTop.g + (darkBottom.g - regularTop.g) * progress);
        const b = Math.round(regularTop.b + (darkBottom.b - regularTop.b) * progress);

        const baseColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

        // Create darker and lighter versions for shadows and highlights
        darkOrange = `#${Math.max(0, r-40).toString(16).padStart(2, '0')}${Math.max(0, g-40).toString(16).padStart(2, '0')}${Math.max(0, b-40).toString(16).padStart(2, '0')}`;
        regularOrange = baseColor;
        lightOrange = `#${Math.min(255, r+30).toString(16).padStart(2, '0')}${Math.min(255, g+30).toString(16).padStart(2, '0')}${Math.min(255, b+30).toString(16).padStart(2, '0')}`;
    } else if (gameState.currentLevel === 35) {
        // Ombre effect: calculate based on Y position (0 at top, canvas.height at bottom)
        const midY = (y1 + y2) / 2; // Get middle Y position of wall
        const progress = Math.min(1, Math.max(0, midY / canvas.height)); // 0 at top, 1 at bottom

        // Interpolate from light orange at top to regular orange at bottom
        const lightTop = { r: 0xFF, g: 0xD9, b: 0xB3 }; // #FFD9B3 - Very light at top
        const regularBottom = { r: 0xE8, g: 0x7A, b: 0x2F }; // #E87A2F - Regular orange at bottom

        const r = Math.round(lightTop.r + (regularBottom.r - lightTop.r) * progress);
        const g = Math.round(lightTop.g + (regularBottom.g - lightTop.g) * progress);
        const b = Math.round(lightTop.b + (regularBottom.b - lightTop.b) * progress);

        const baseColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

        // Create darker and lighter versions for shadows and highlights
        darkOrange = `#${Math.max(0, r-40).toString(16).padStart(2, '0')}${Math.max(0, g-40).toString(16).padStart(2, '0')}${Math.max(0, b-40).toString(16).padStart(2, '0')}`;
        regularOrange = baseColor;
        lightOrange = `#${Math.min(255, r+20).toString(16).padStart(2, '0')}${Math.min(255, g+20).toString(16).padStart(2, '0')}${Math.min(255, b+20).toString(16).padStart(2, '0')}`;
    } else if (gameState.currentLevel === 45 || gameState.currentLevel === 47) {
        // Ombre effect: calculate based on Y position (0 at top, canvas.height at bottom)
        const midY = (y1 + y2) / 2; // Get middle Y position of wall
        const progress = Math.min(1, Math.max(0, midY / canvas.height)); // 0 at top, 1 at bottom

        // Interpolate from light orange at top to regular orange at bottom
        const lightTop = { r: 0xFF, g: 0xD9, b: 0xB3 }; // #FFD9B3 - Very light at top
        const regularBottom = { r: 0xE8, g: 0x7A, b: 0x2F }; // #E87A2F - Regular orange at bottom

        const r = Math.round(lightTop.r + (regularBottom.r - lightTop.r) * progress);
        const g = Math.round(lightTop.g + (regularBottom.g - lightTop.g) * progress);
        const b = Math.round(lightTop.b + (regularBottom.b - lightTop.b) * progress);

        const baseColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

        // Create darker and lighter versions for shadows and highlights
        darkOrange = `#${Math.max(0, r-40).toString(16).padStart(2, '0')}${Math.max(0, g-40).toString(16).padStart(2, '0')}${Math.max(0, b-40).toString(16).padStart(2, '0')}`;
        regularOrange = baseColor;
        lightOrange = `#${Math.min(255, r+20).toString(16).padStart(2, '0')}${Math.min(255, g+20).toString(16).padStart(2, '0')}${Math.min(255, b+20).toString(16).padStart(2, '0')}`;
    } else if (gameState.currentLevel === 46) {
        // Ombre effect: calculate based on Y position (0 at top, canvas.height at bottom)
        const midY = (y1 + y2) / 2; // Get middle Y position of wall
        const progress = Math.min(1, Math.max(0, midY / canvas.height)); // 0 at top, 1 at bottom

        // Interpolate from white at top to orange at bottom
        const whiteTop = { r: 0xFF, g: 0xFF, b: 0xFF }; // #FFFFFF - Pure white at top
        const orangeBottom = { r: 0xE8, g: 0x7A, b: 0x2F }; // #E87A2F - Regular orange at bottom

        const r = Math.round(whiteTop.r + (orangeBottom.r - whiteTop.r) * progress);
        const g = Math.round(whiteTop.g + (orangeBottom.g - whiteTop.g) * progress);
        const b = Math.round(whiteTop.b + (orangeBottom.b - whiteTop.b) * progress);

        const baseColor = `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;

        // Create darker and lighter versions for shadows and highlights
        darkOrange = `#${Math.max(0, r-40).toString(16).padStart(2, '0')}${Math.max(0, g-40).toString(16).padStart(2, '0')}${Math.max(0, b-40).toString(16).padStart(2, '0')}`;
        regularOrange = baseColor;
        lightOrange = `#${Math.min(255, r+20).toString(16).padStart(2, '0')}${Math.min(255, g+20).toString(16).padStart(2, '0')}${Math.min(255, b+20).toString(16).padStart(2, '0')}`;
    } else if (gameState.currentLevel === 17 || gameState.currentLevel === 32 || gameState.currentLevel === 37 || gameState.currentLevel === 39 || gameState.currentLevel === 43 || gameState.currentLevel === 48) {
        darkOrange = '#FFB380';      // Light orange for shadows
        regularOrange = '#FFC299';   // Very light orange for base
        lightOrange = '#FFD9B3';     // Bright pale orange for highlights
    } else {
        darkOrange = '#B8540C';      // Dark orange for shadows
        regularOrange = '#E87A2F';   // Regular orange for base
        lightOrange = '#FFB380';     // Light orange for highlights
    }

    ctx.save();

    // Create deterministic position based on coordinates (static, not random)
    function getStaticOffset(x, y, seed) {
        // Simple hash function for consistent pseudo-random values
        const hash = Math.sin(x * 12.9898 + y * 78.233 + seed) * 43758.5453;
        return hash - Math.floor(hash);
    }

    // Layer 1: Dark orange shadows (bottom/back layer)
    ctx.fillStyle = darkOrange;
    for (let i = 0; i < numBumps; i++) {
        const progress = i / numBumps;
        let bumpX, bumpY;

        if (orientation === 'horizontal') {
            bumpX = x1 + progress * length + (getStaticOffset(x1, y1, i) - 0.5) * 3;
            bumpY = y1 + 2;
        } else {
            bumpX = x1 + 2;
            bumpY = y1 + progress * length + (getStaticOffset(x1, y1, i) - 0.5) * 3;
        }

        ctx.beginPath();
        ctx.arc(bumpX, bumpY, bumpSize * 0.85, 0, Math.PI * 2);
        ctx.fill();
    }

    // Layer 2: Regular orange base (middle layer)
    ctx.fillStyle = regularOrange;
    for (let i = 0; i < numBumps; i++) {
        const progress = i / numBumps;
        let bumpX, bumpY;

        if (orientation === 'horizontal') {
            bumpX = x1 + progress * length + (getStaticOffset(x1, y1, i + 100) - 0.5) * 2.5;
            bumpY = y1;
        } else {
            bumpX = x1;
            bumpY = y1 + progress * length + (getStaticOffset(x1, y1, i + 100) - 0.5) * 2.5;
        }

        ctx.beginPath();
        ctx.arc(bumpX, bumpY, bumpSize, 0, Math.PI * 2);
        ctx.fill();

        // Add smaller detail bumps in regular orange
        if (getStaticOffset(x1, y1, i + 200) > 0.5) {
            ctx.beginPath();
            ctx.arc(
                bumpX + (getStaticOffset(x1, y1, i + 300) - 0.5) * 5,
                bumpY + (getStaticOffset(x1, y1, i + 400) - 0.5) * 5,
                bumpSize * 0.45,
                0,
                Math.PI * 2
            );
            ctx.fill();
        }
    }

    // Layer 3: Light orange highlights (top layer)
    ctx.fillStyle = lightOrange;
    for (let i = 0; i < numBumps; i++) {
        const progress = i / numBumps;

        // Only add highlights to some bumps for natural look
        if (getStaticOffset(x1, y1, i + 500) > 0.6) {
            let bumpX, bumpY;

            if (orientation === 'horizontal') {
                bumpX = x1 + progress * length + (getStaticOffset(x1, y1, i + 600) - 0.5) * 3;
                bumpY = y1 - 1.5;
            } else {
                bumpX = x1 - 1.5;
                bumpY = y1 + progress * length + (getStaticOffset(x1, y1, i + 600) - 0.5) * 3;
            }

            ctx.beginPath();
            ctx.arc(bumpX, bumpY, bumpSize * 0.55, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    ctx.restore();
}

// Draw Sawyer Character (SVG)
function drawDog() {
    ctx.save();

    // Add glowing effect around Sawyer
    // Extra bright glow for levels 46 and 47
    if (gameState.currentLevel === 46 || gameState.currentLevel === 47) {
        // Draw multiple layers of glow for extra brightness
        // Layer 1: Outer bright glow
        ctx.shadowColor = 'rgba(255, 255, 255, 0.9)';  // Bright white outer glow
        ctx.shadowBlur = 60;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Draw first pass with white glow
        if (player.direction === 'left') {
            ctx.save();
            ctx.translate(player.x + player.width, player.y);
            ctx.scale(-1, 1);
            ctx.drawImage(characterImage, 0, 0, player.width, player.height);
            ctx.restore();
        } else {
            ctx.drawImage(characterImage, player.x, player.y, player.width, player.height);
        }

        // Layer 2: Inner golden glow
        ctx.shadowColor = 'rgba(255, 240, 150, 1)';
        ctx.shadowBlur = 40;

        // Draw second pass with golden glow
        if (player.direction === 'left') {
            ctx.save();
            ctx.translate(player.x + player.width, player.y);
            ctx.scale(-1, 1);
            ctx.drawImage(characterImage, 0, 0, player.width, player.height);
            ctx.restore();
        } else {
            ctx.drawImage(characterImage, player.x, player.y, player.width, player.height);
        }

        // Layer 3: White outline for extra brightness
        ctx.shadowColor = 'rgba(255, 255, 255, 1)';
        ctx.shadowBlur = 5;
    } else {
        ctx.shadowColor = 'rgba(255, 220, 120, 1)';  // Brighter warm golden glow
        ctx.shadowBlur = 30;
    }
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Flip image if moving left
    if (player.direction === 'left') {
        ctx.translate(player.x + player.width, player.y);
        ctx.scale(-1, 1);
        ctx.drawImage(characterImage, 0, 0, player.width, player.height);
    } else {
        ctx.drawImage(characterImage, player.x, player.y, player.width, player.height);
    }

    ctx.restore();
}

// Draw Puzzle Piece
function drawPuzzlePiece() {
    ctx.save();

    // Gentle floating animation
    const floatY = Math.sin(Date.now() / 500) * 5;

    // Gentle rotation for visual effect
    const rotation = Math.sin(Date.now() / 1000) * 0.1;

    // Glow effect
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#FFD700';

    // Position and rotate from center
    ctx.translate(puzzlePiece.x + puzzlePiece.width / 2, puzzlePiece.y + puzzlePiece.height / 2 + floatY);
    ctx.rotate(rotation);

    // Draw the SVG puzzle piece image
    ctx.drawImage(
        puzzlePieceImage,
        -puzzlePiece.width / 2,
        -puzzlePiece.height / 2,
        puzzlePiece.width,
        puzzlePiece.height
    );

    ctx.restore();

    // Draw floating animation shadow
    const shadowFloatY = Math.sin(Date.now() / 500) * 3;
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.ellipse(
        puzzlePiece.x + puzzlePiece.width / 2,
        puzzlePiece.y + puzzlePiece.height + 10 + shadowFloatY,
        15, 4, 0, 0, Math.PI * 2
    );
    ctx.fill();
    ctx.restore();
}

// Puzzle state
const puzzleState = {
    slots: [],
    pieces: [],
    completedPieces: 0
};

// Show Final Puzzle
function showFinalPuzzle() {
    document.getElementById('gameScreen').classList.remove('active');
    document.getElementById('finalPuzzle').classList.add('active');

    initializePuzzle();
}

// Initialize Interactive Puzzle
function initializePuzzle() {
    const puzzleGrid = document.getElementById('puzzleGrid');
    const puzzlePiecesContainer = document.getElementById('puzzlePiecesContainer');

    console.log('Initializing puzzle...');
    console.log('Grid element:', puzzleGrid);
    console.log('Pieces container:', puzzlePiecesContainer);

    if (!puzzleGrid || !puzzlePiecesContainer) {
        console.error('Puzzle elements not found!');
        return;
    }

    puzzleGrid.innerHTML = '';
    puzzlePiecesContainer.innerHTML = '';
    puzzleState.completedPieces = 0;
    puzzleState.slots = [];
    puzzleState.pieces = [];

    // Create 50 puzzle slots (10x5 grid)
    for (let i = 0; i < 50; i++) {
        const slot = document.createElement('div');
        slot.className = 'puzzle-slot';
        slot.dataset.position = i;

        // Add drag and drop handlers
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('drop', handleDrop);
        slot.addEventListener('dragleave', handleDragLeave);

        puzzleGrid.appendChild(slot);
        puzzleState.slots.push(slot);
    }

    // Create 50 draggable puzzle pieces in random order
    const pieceNumbers = Array.from({length: 50}, (_, i) => i);
    shuffleArray(pieceNumbers);

    pieceNumbers.forEach((num, index) => {
        const piece = document.createElement('div');
        piece.className = 'puzzle-piece';
        piece.draggable = true;
        piece.dataset.correctPosition = num;
        piece.textContent = num + 1; // Show piece number
        piece.style.animationDelay = `${index * 0.02}s`;

        // Add drag handlers
        piece.addEventListener('dragstart', handleDragStart);
        piece.addEventListener('dragend', handleDragEnd);

        puzzlePiecesContainer.appendChild(piece);
        puzzleState.pieces.push(piece);
    });

    console.log('Created', puzzleState.slots.length, 'slots and', puzzleState.pieces.length, 'pieces');
}

// Shuffle array function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Drag and Drop Handlers
let draggedPiece = null;

function handleDragStart(e) {
    draggedPiece = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.classList.add('drag-over');
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');

    if (!draggedPiece) return;

    const slot = e.currentTarget;
    const slotPosition = parseInt(slot.dataset.position);
    const pieceCorrectPosition = parseInt(draggedPiece.dataset.correctPosition);

    // Check if piece is placed in correct position
    if (slotPosition === pieceCorrectPosition && !slot.classList.contains('filled')) {
        // Correct placement!
        slot.classList.add('filled');
        draggedPiece.remove(); // Remove from pieces container
        puzzleState.completedPieces++;

        // Play success sound or animation here (optional)
        slot.style.background = 'transparent';

        // Check if puzzle is complete
        if (puzzleState.completedPieces === 50) {
            setTimeout(() => {
                showVictoryScreen();
            }, 500);
        }
    } else {
        // Wrong placement - piece returns to container
        // Visual feedback
        draggedPiece.style.animation = 'shake 0.3s';
        setTimeout(() => {
            draggedPiece.style.animation = '';
        }, 300);
    }

    draggedPiece = null;
}

// Show Victory Screen
function showVictoryScreen() {
    // Hide all other screens
    document.getElementById('homepage').classList.remove('active');
    document.getElementById('gameScreen').classList.remove('active');
    document.getElementById('finalPuzzle').classList.remove('active');
    document.getElementById('pauseMenu').classList.remove('active');

    // Show victory screen
    document.getElementById('victoryScreen').classList.add('active');
}

// Victory Play Again Button
document.getElementById('playAgainVictory').addEventListener('click', function() {
    gameState.currentLevel = 1;
    gameState.puzzlePieces = 0;
    document.getElementById('victoryScreen').classList.remove('active');
    document.getElementById('homepage').classList.add('active');
});
