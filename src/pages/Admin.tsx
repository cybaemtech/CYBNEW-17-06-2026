import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Pencil, Trash2, LogOut, Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";
import SEOHead from "@/components/SEOHead";
import Navbar from "@/components/Navbar";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  author: string;
  category: string | null;
  tags: string[] | null;
  published: boolean;
  published_at: string | null;
  created_at: string;
}

const emptyPost = {
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  cover_image: "",
  author: "Cybaem Tech",
  category: "",
  tags: "",
  published: false,
};

const Admin = () => {
  const { user, loading: authLoading, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(emptyPost);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) navigate("/login");
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!authLoading && user && !isAdmin) {
      toast({ title: "Access Denied", description: "You don't have admin privileges.", variant: "destructive" });
      navigate("/");
    }
  }, [authLoading, user, isAdmin, navigate]);

  useEffect(() => {
    if (isAdmin) fetchPosts();
  }, [isAdmin]);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setPosts(data as BlogPost[]);
    setLoading(false);
  };

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const openCreate = () => {
    setEditing(null);
    setForm(emptyPost);
    setShowForm(true);
  };

  const openEdit = (post: BlogPost) => {
    setEditing(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content,
      cover_image: post.cover_image || "",
      author: post.author,
      category: post.category || "",
      tags: post.tags?.join(", ") || "",
      published: post.published,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.content) {
      toast({ title: "Missing fields", description: "Title and content are required.", variant: "destructive" });
      return;
    }

    setSaving(true);
    const payload = {
      title: form.title,
      slug: form.slug || generateSlug(form.title),
      excerpt: form.excerpt || null,
      content: form.content,
      cover_image: form.cover_image || null,
      author: form.author || "Cybaem Tech",
      category: form.category || null,
      tags: form.tags ? form.tags.split(",").map((t: string) => t.trim()).filter(Boolean) : null,
      published: form.published,
      published_at: form.published ? new Date().toISOString() : null,
    };

    let error;
    if (editing) {
      ({ error } = await supabase.from("blog_posts").update(payload).eq("id", editing));
    } else {
      ({ error } = await supabase.from("blog_posts").insert(payload));
    }

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: editing ? "Post updated" : "Post created" });
    }

    setSaving(false);
    setShowForm(false);
    fetchPosts();
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    const { error } = await supabase.from("blog_posts").delete().eq("id", deleteId);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Post deleted" });
      fetchPosts();
    }
    setDeleteId(null);
  };

  if (authLoading || (!isAdmin && user)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <SEOHead title="Admin Dashboard | Cybaem Tech" description="Manage blog posts." canonical="/admin" />
      <Navbar />

      <main className="min-h-screen bg-background pt-28 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">Blog Admin</h1>
              <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={openCreate}>
                <Plus size={16} className="mr-2" /> New Post
              </Button>
              <Button variant="outline" onClick={() => { signOut(); navigate("/"); }}>
                <LogOut size={16} className="mr-2" /> Sign Out
              </Button>
            </div>
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden mb-8"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="font-display text-xl">
                      {editing ? "Edit Post" : "New Post"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Title *</Label>
                        <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Post title" />
                      </div>
                      <div className="space-y-2">
                        <Label>Slug</Label>
                        <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="auto-generated-from-title" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Excerpt</Label>
                      <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Short summary..." rows={2} />
                    </div>
                    <div className="space-y-2">
                      <Label>Content * (HTML)</Label>
                      <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="<h2>Section</h2><p>Content...</p>" rows={10} className="font-mono text-sm" />
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Cover Image URL</Label>
                        <Input value={form.cover_image} onChange={(e) => setForm({ ...form, cover_image: e.target.value })} placeholder="https://..." />
                      </div>
                      <div className="space-y-2">
                        <Label>Author</Label>
                        <Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
                      </div>
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Enterprise Software" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Tags (comma-separated)</Label>
                        <Input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="react, typescript, devops" />
                      </div>
                      <div className="flex items-center gap-3 pt-6">
                        <Switch checked={form.published} onCheckedChange={(checked) => setForm({ ...form, published: checked })} />
                        <Label>Published</Label>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-2">
                      <Button onClick={handleSave} disabled={saving}>
                        {saving ? <Loader2 size={16} className="mr-2 animate-spin" /> : null}
                        {editing ? "Update Post" : "Create Post"}
                      </Button>
                      <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">No posts yet. Create your first post!</div>
          ) : (
            <div className="space-y-3">
              {posts.map((post) => (
                <motion.div key={post.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card hover:bg-accent/5 transition-colors">
                  <div className="flex-1 min-w-0 mr-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-foreground truncate">{post.title}</h3>
                      {post.published ? (
                        <Badge className="shrink-0 bg-green-500/15 text-green-700 border-green-500/30 hover:bg-green-500/20">
                          <Eye size={12} className="mr-1" /> Published
                        </Badge>
                      ) : (
                        <Badge variant="secondary" className="shrink-0"><EyeOff size={12} className="mr-1" /> Draft</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {post.category && <span className="mr-2">{post.category} •</span>}
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <Button size="sm" variant="outline" onClick={() => openEdit(post)}><Pencil size={14} /></Button>
                    <Button size="sm" variant="outline" className="text-destructive hover:text-destructive" onClick={() => setDeleteId(post.id)}><Trash2 size={14} /></Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </main>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this post?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. The post will be permanently removed.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Admin;
