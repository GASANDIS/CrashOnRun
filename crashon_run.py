import pygame
import random

Initialize pygame

pygame.init()

Game Constants

WIDTH, HEIGHT = 800, 600 WHITE = (255, 255, 255) BLACK = (0, 0, 0) RED = (255, 0, 0) BLUE = (0, 0, 255)

Create Game Window

screen = pygame.display.set_mode((WIDTH, HEIGHT)) pygame.display.set_caption("CrashOn Run")

Load Assets

player_size = 50 player = pygame.Rect(WIDTH//4, HEIGHT//2, player_size, player_size) velocity = 5

glitches = [] clock = pygame.time.Clock()

def spawn_glitch(): x = random.randint(WIDTH//2, WIDTH) y = random.randint(0, HEIGHT - 50) size = random.randint(30, 60) glitches.append(pygame.Rect(x, y, size, size))

def move_glitches(): for glitch in glitches: glitch.x -= 5  # Move left

Main Game Loop

running = True while running: screen.fill(WHITE) pygame.draw.rect(screen, BLUE, player)

# Event Handling
for event in pygame.event.get():
    if event.type == pygame.QUIT:
        running = False

keys = pygame.key.get_pressed()
if keys[pygame.K_UP] and player.y > 0:
    player.y -= velocity
if keys[pygame.K_DOWN] and player.y < HEIGHT - player_size:
    player.y += velocity

# Spawn and move glitches
if random.randint(1, 30) == 1:
    spawn_glitch()
move_glitches()

# Draw glitches
for glitch in glitches:
    pygame.draw.rect(screen, RED, glitch)

pygame.display.flip()
clock.tick(30)

pygame.quit()