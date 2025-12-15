import {Request, Response, NextFunction} from 'express';

// Supported API versions
export const SUPPORTED_VERSIONS = ['v1'] as const;
export type ApiVersion = typeof SUPPORTED_VERSIONS[number];
export const DEFAULT_VERSION: ApiVersion = 'v1';

/**
 * Extract API version from request
 */
export function getApiVersion(req: Request): ApiVersion {
  // Check Accept header: application/vnd.api+json;version=1
  const acceptHeader = req.get('Accept') || '';
  const versionMatch = acceptHeader.match(/version[=:](\d+)/i);
  if (versionMatch) {
    const version = `v${versionMatch[1]}`;
    if (SUPPORTED_VERSIONS.includes(version as ApiVersion)) {
      return version as ApiVersion;
    }
  }

  // Check query parameter: ?version=1
  const queryVersion = req.query.version as string;
  if (queryVersion) {
    const version = queryVersion.startsWith('v') ? queryVersion : `v${queryVersion}`;
    if (SUPPORTED_VERSIONS.includes(version as ApiVersion)) {
      return version as ApiVersion;
    }
  }

  // Check path: /api/v1/...
  const pathMatch = req.path.match(/^\/api\/(v\d+)\//);
  if (pathMatch) {
    const version = pathMatch[1];
    if (SUPPORTED_VERSIONS.includes(version as ApiVersion)) {
      return version as ApiVersion;
    }
  }

  // Default version
  return DEFAULT_VERSION;
}

/**
 * API versioning middleware
 */
export const versioningMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const version = getApiVersion(req);

  // Add version to request
  (req as any).apiVersion = version;

  // Add version header to response
  res.setHeader('X-API-Version', version);

  // Add deprecation warning for old versions (if needed in future)
  if (version !== DEFAULT_VERSION) {
    res.setHeader('X-API-Deprecated', 'true');
    res.setHeader('X-API-Deprecation-Date', '2025-12-31');
    res.setHeader('X-API-Sunset-Date', '2026-12-31');
  }

  next();
};



