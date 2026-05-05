import * as fs from 'fs';
let content = fs.readFileSync('src/pages/Members.tsx', 'utf8');

const replacement = `                          <td className="px-6 py-4 text-center align-middle">
                        <div className="flex items-center justify-center gap-2">
                           <button 
                            onClick={(e) => { e.stopPropagation(); handleViewMember(member); }}
                            className="p-2 text-text-muted hover:text-accent hover:bg-accent/10 rounded-lg transition-all transform active:scale-90"
                            title="View / Entity Registry"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleEditClick(member); }}
                            className="p-2 text-text-muted hover:text-trust hover:bg-trust/10 rounded-lg transition-all transform active:scale-90"
                            title="Edit Record"
                          >
                            <UserCheck className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleDeleteClick(member); }}
                            className="p-2 text-text-muted hover:text-danger hover:bg-danger/10 rounded-lg transition-all transform active:scale-90"
                            title="Terminate Record"
                          >
                            <UserX className="w-4 h-4" />
                          </button>
                        </div>
                      </td>`;

const target = `                      {!selectedMember && (
                        <>
                          <td className="px-6 py-4 text-left">
                            <span className="text-[12px] font-black text-text-muted uppercase">{member.email}</span>
                          </td>
                          <td className="px-6 py-4 text-left">
                            <Badge className={cn(
                              "text-[9px] font-black uppercase tracking-widest px-3 border-none",
                              member.status === 'Active' ? 'bg-success/10 text-success' :
                              member.status === 'Pending' ? 'bg-trust/10 text-trust' :
                              'bg-danger/10 text-danger'
                            )}>
                              {member.status}
                            </Badge>
                          </td>
` + replacement + `
                        </>
                      )}`;

content = content.replace(/<\!-\-[\s\S]*?-->/g, ''); // Clear any previous temp comments
content = content.replace(replacement, ''); // Remove if accidentally placed outside

// Find the exact place where `{!selectedMember && (` is
// I will just use regex to wrap the cell.
fs.writeFileSync('src/pages/Members.tsx', content);
