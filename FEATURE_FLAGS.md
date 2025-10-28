# Feature Flags Guide

## Overview

This application uses environment-based feature flags to control functionality. Feature flags allow you to enable or disable features without changing code.

## Available Feature Flags

### `REACT_APP_API_ENABLED`

Controls whether the application can make API calls to the backend service.

#### Configuration

```bash
# Enable API calls (default)
REACT_APP_API_ENABLED=true

# Disable API calls
REACT_APP_API_ENABLED=false
```

#### Behavior

**When Enabled (`true`):**
- ✅ Users can submit questions
- ✅ Application makes POST requests to `REACT_APP_API_URL/api/ask`
- ✅ Bot responds with AI-generated answers
- ✅ Citations and sources are displayed
- ✅ Full application functionality

**When Disabled (`false`):**
- 🔒 API calls are blocked at the application level
- 💬 Users see an informational message:
  > 🔒 The API feature is currently disabled. To enable this functionality, please set the REACT_APP_API_ENABLED environment variable to 'true' and restart the application.
- 🎨 Message is displayed with blue information styling
- ⚡ No network requests are made
- 💰 No API costs incurred

#### Use Cases

**Development:**
- Test UI without backend
- Frontend development without API dependency
- Prototype and design work

**Demo/Testing:**
- Show UI to stakeholders before backend is ready
- Test error handling and edge cases
- QA testing of frontend components

**Production:**
- Emergency feature disable during incidents
- Gradual rollout control
- Maintenance mode

**Cost Control:**
- Disable in non-production environments
- Reduce API usage during development
- Control access to expensive AI services

#### Screenshots

**Enabled State:**
```
User: What is the company policy?
Bot: Based on the documentation, here's the policy...
      Sources: [1] company-handbook.pdf
```

**Disabled State:**
```
User: What is the company policy?
Bot: 🔒 The API feature is currently disabled. To enable this 
     functionality, please set the REACT_APP_API_ENABLED 
     environment variable to 'true' and restart the application.
```

## How to Toggle Feature Flags

### Local Development

1. **Edit `.env` file:**
   ```bash
   REACT_APP_API_ENABLED=false
   ```

2. **Restart development server:**
   ```bash
   npm start
   ```

### Production Deployment

#### Vercel
1. Go to Project Settings → Environment Variables
2. Edit `REACT_APP_API_ENABLED` value
3. Redeploy the application

#### Netlify
1. Go to Site Settings → Build & Deploy → Environment
2. Edit `REACT_APP_API_ENABLED` value
3. Trigger a new deploy

#### AWS Amplify
1. Go to App Settings → Environment Variables
2. Edit `REACT_APP_API_ENABLED` value
3. Redeploy the application

#### Docker
Pass the environment variable:
```bash
docker run -e REACT_APP_API_ENABLED=false your-image
```

Or use environment file:
```bash
docker run --env-file .env.disabled your-image
```

## Testing Feature Flags

### Test Plan

1. **Test Enabled State:**
   - Set `REACT_APP_API_ENABLED=true`
   - Restart application
   - Submit a question
   - Verify API call is made
   - Verify response is displayed

2. **Test Disabled State:**
   - Set `REACT_APP_API_ENABLED=false`
   - Restart application
   - Submit a question
   - Verify no API call is made
   - Verify informational message is displayed
   - Verify message has blue styling

3. **Test Toggle:**
   - Start with enabled
   - Change to disabled
   - Restart and verify behavior
   - Change back to enabled
   - Restart and verify behavior

## Adding New Feature Flags

To add a new feature flag:

1. **Add to environment files:**
   ```bash
   # .env
   REACT_APP_NEW_FEATURE=true
   ```

2. **Add to application:**
   ```javascript
   const NEW_FEATURE_ENABLED = process.env.REACT_APP_NEW_FEATURE === 'true';
   ```

3. **Implement feature check:**
   ```javascript
   if (NEW_FEATURE_ENABLED) {
     // Feature code
   } else {
     // Fallback or message
   }
   ```

4. **Document in this file**

## Best Practices

1. ✅ Always provide fallback behavior when feature is disabled
2. ✅ Show clear messages to users when features are unavailable
3. ✅ Document all feature flags and their purposes
4. ✅ Use feature flags for gradual rollouts
5. ✅ Test both enabled and disabled states
6. ✅ Clean up feature flags after full rollout
7. ✅ Use descriptive flag names
8. ✅ Default to safe/disabled state when appropriate

## Troubleshooting

**Feature flag not working:**
- ✓ Check environment variable name starts with `REACT_APP_`
- ✓ Verify value is exactly `'true'` or `'false'` (lowercase)
- ✓ Restart development server after changing `.env`
- ✓ Check browser console for errors
- ✓ Verify build was created with correct environment variables

**Wrong behavior in production:**
- ✓ Verify environment variables are set on hosting platform
- ✓ Redeploy application after changing environment variables
- ✓ Check build logs for environment variable values
- ✓ Clear browser cache and reload

## Security Considerations

⚠️ **Important:** Feature flags are embedded in the client-side code at build time. They are **publicly visible** in the browser.

- ❌ Do NOT use feature flags for security controls
- ❌ Do NOT put sensitive data in feature flags
- ✅ Use feature flags only for feature visibility/availability
- ✅ Implement actual security controls on the backend
- ✅ Use feature flags for UX and functionality control only

## Monitoring

Consider tracking:
- Which features are enabled in each environment
- User interactions with disabled features
- Feature flag toggle history
- Impact on application usage

## Future Enhancements

Potential improvements:
- [ ] Remote feature flag management
- [ ] Per-user feature flags
- [ ] Gradual percentage rollouts
- [ ] A/B testing support
- [ ] Feature flag analytics dashboard

