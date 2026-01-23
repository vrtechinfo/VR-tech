# Security Policy

## Reporting a Vulnerability

We take security seriously! If you discover a security vulnerability in VR-Tech, please report it responsibly by emailing **security@vr-tech-info.com** instead of using the public issue tracker.

### Reporting Guidelines:
1. **Do not** disclose the vulnerability publicly until we've had a chance to address it
2. Include detailed information about the vulnerability
3. Provide steps to reproduce the issue if possible
4. Allow us up to **30 days** to respond and issue a patch

## Security Standards

### Dependencies
- All npm dependencies are regularly scanned for vulnerabilities
- We use Dependabot to automatically monitor and update dependencies
- Security updates are prioritized and deployed immediately

### Code Security
- Code is scanned using:
  - **Trivy** - Container and filesystem vulnerability scanning
  - **CodeQL** - Code quality and security analysis
- All pull requests are automatically analyzed for security issues

### Deployment Security
- Secrets are never committed to the repository
- All sensitive data uses GitHub Secrets for storage
- Docker images are built with security best practices
- CI/CD pipeline includes automated security checks

## Security Contact

For security inquiries, please contact: **vrtechinfo@example.com**

## Version Support

We recommend always running the latest version to get security updates.

| Version | Supported |
|---------|-----------|
| Latest  | ✅ Yes    |
| < Latest| ❌ No     |

## Additional Resources

- [GitHub Security Policy](https://docs.github.com/en/code-security)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Best Practices](https://nodejs.org/en/docs/guides/security/)
