# Headless Monk

A Drupal + React starter with Lando for local development.

 - Installs Drupal 8 with a React Frontend.
 - Pre-installs sample data for the demo.

http://headless.lndo.site

http://backend.headless.lndo.site

## Requirements

 - Docker
 - Lando
 - Clean Underpants

## How to Use

 - Clone this repo and `cd` into it.
 - `lando start`
 - `lando front:start`
 - `cd backend/web && lando drush genc 5 --types=article`
 - Navigate to http://headless.lndo.site
 - Get to work and make it your own.
