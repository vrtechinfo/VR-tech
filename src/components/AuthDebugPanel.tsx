'use client';

import { useEffect, useState } from 'react';

export function AuthDebugPanel() {
    const [diagnostics, setDiagnostics] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showPanel, setShowPanel] = useState(false);

    useEffect(() => {
        const fetchDiagnostics = async () => {
            try {
                const response = await fetch('/api/debug/auth-status');
                const data = await response.json();
                setDiagnostics(data);
            } catch (error) {
                console.error('Failed to fetch diagnostics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDiagnostics();
    }, []);

    if (process.env.NODE_ENV !== 'development') {
        return null;
    }

    return (
        <>
            {/* Debug Toggle Button */}
            <button
                onClick={() => setShowPanel(!showPanel)}
                className="fixed bottom-4 right-4 px-3 py-2 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700 z-50"
            >
                🔧 Debug
            </button>

            {/* Debug Panel */}
            {showPanel && (
                <div className="fixed bottom-16 right-4 w-96 bg-zinc-900 border border-zinc-700 rounded-lg p-4 text-xs text-white font-mono z-50 max-h-[600px] overflow-y-auto">
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-bold">Auth Diagnostics</h3>
                        <button
                            onClick={() => setShowPanel(false)}
                            className="text-yellow-500 hover:text-yellow-400"
                        >
                            ✕
                        </button>
                    </div>

                    {loading ? (
                        <div className="text-yellow-500">Loading...</div>
                    ) : diagnostics ? (
                        <div className="space-y-2">
                            {/* Environment */}
                            <div className="border-t border-zinc-700 pt-2">
                                <h4 className="text-yellow-400 font-bold">Environment</h4>
                                <div className="pl-2">
                                    <div>Node: {diagnostics.environment.nodeEnv}</div>
                                    <div>App URL: {diagnostics.environment.nextPublicAppUrl || 'Not set'}</div>
                                    <div>DB: {diagnostics.environment.databaseUrl}</div>
                                    <div>Auth Secret: {diagnostics.environment.betterAuthSecret}</div>
                                </div>
                            </div>

                            {/* Database */}
                            <div className="border-t border-zinc-700 pt-2">
                                <h4 className={`font-bold ${diagnostics.database.connected ? 'text-green-400' : 'text-red-400'}`}>
                                    Database {diagnostics.database.connected ? '✓' : '✗'}
                                </h4>
                                <div className="pl-2">
                                    {diagnostics.database.connected ? (
                                        <>
                                            <div>Tables: {diagnostics.database.tables.join(', ') || 'None'}</div>
                                        </>
                                    ) : (
                                        <div className="text-red-400">{diagnostics.database.error}</div>
                                    )}
                                </div>
                            </div>

                            {/* Auth */}
                            <div className="border-t border-zinc-700 pt-2">
                                <h4 className={`font-bold ${diagnostics.auth.tablesExist ? 'text-green-400' : 'text-red-400'}`}>
                                    Auth {diagnostics.auth.tablesExist ? '✓' : '✗'}
                                </h4>
                                <div className="pl-2">
                                    {diagnostics.auth.error ? (
                                        <div className="text-red-400">{diagnostics.auth.error}</div>
                                    ) : (
                                        <>
                                            <div>Users: {diagnostics.auth.usersCount}</div>
                                            {diagnostics.auth.users && diagnostics.auth.users.length > 0 && (
                                                <div className="mt-1">
                                                    <div className="text-yellow-400">Users:</div>
                                                    {diagnostics.auth.users.map((u: any) => (
                                                        <div key={u.id} className="text-xs pl-2">
                                                            {u.email} ({u.name})
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="border-t border-zinc-700 pt-2 mt-2 text-xs text-zinc-400">
                                {diagnostics.timestamp}
                            </div>
                        </div>
                    ) : (
                        <div className="text-red-400">Failed to load diagnostics</div>
                    )}
                </div>
            )}
        </>
    );
}
