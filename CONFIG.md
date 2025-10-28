# Configuration Guide

## Environment Variables

The application uses environment variables to configure the API endpoint. This allows you to easily change the backend URL for different deployment environments.

### Setting Up Environment Variables

#### For Local Development:

1. Create a `.env` file in the root directory of your project:

```bash
# .env
REACT_APP_API_URL=http://localhost:8000
```

2. Restart the development server:
```bash
npm start
```

**Note:** Any changes to `.env` files require restarting the development server.

#### For Production Deployment:

Create a `.env.production` file:

```bash
# .env.production
REACT_APP_API_URL=https://your-api-domain.com
```

#### For Different Environments:

You can create multiple environment files:

- `.env` - Default for all environments
- `.env.local` - Local overrides (not committed to git)
- `.env.development` - Development environment
- `.env.production` - Production environment
- `.env.test` - Test environment

### Environment Variables Available:

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `REACT_APP_API_URL` | Backend API base URL | `http://localhost:8000` | No |

### Examples:

**Local Development:**
```
REACT_APP_API_URL=http://localhost:8000
```

**Staging Environment:**
```
REACT_APP_API_URL=https://staging-api.yourcompany.com
```

**Production Environment:**
```
REACT_APP_API_URL=https://api.yourcompany.com
```

### Deployment Platforms:

#### Vercel:
Add environment variables in your project settings:
- Go to Project Settings → Environment Variables
- Add `REACT_APP_API_URL` with your production API URL

#### Netlify:
Add environment variables in build settings:
- Go to Site Settings → Build & Deploy → Environment
- Add `REACT_APP_API_URL` with your production API URL

#### AWS Amplify:
Add environment variables in app settings:
- Go to App Settings → Environment Variables
- Add `REACT_APP_API_URL` with your production API URL

#### Docker:
Pass environment variables when running the container:
```bash
docker run -e REACT_APP_API_URL=https://api.yourcompany.com your-image
```

Or use a `.env` file:
```bash
docker run --env-file .env your-image
```

### Important Notes:

1. **Prefix Required:** All custom environment variables must start with `REACT_APP_` to be accessible in the React application.

2. **Build Time:** Environment variables are embedded into the build at **build time**, not runtime. You need to rebuild the app when changing environment variables for production.

3. **Security:** Never store sensitive information (API keys, secrets, passwords) in environment variables that start with `REACT_APP_` as they will be publicly visible in the client-side code.

4. **Git:** The `.env` file is already in `.gitignore`. Never commit actual `.env` files to version control. Instead, commit `.env.example` as a template.

### Verifying Configuration:

To verify which API URL is being used, check the browser console. The application will display the configured URL in error messages if connection fails.

You can also add this to your code temporarily to check:
```javascript
console.log('API URL:', process.env.REACT_APP_API_URL);
```

### Troubleshooting:

**Variables not loading?**
- Ensure the variable starts with `REACT_APP_`
- Restart the development server
- Check that the `.env` file is in the project root
- Verify there are no syntax errors in the `.env` file

**Production build not using correct URL?**
- Ensure environment variables are set on your hosting platform
- Verify the build process has access to the environment variables
- Rebuild the application after changing environment variables

